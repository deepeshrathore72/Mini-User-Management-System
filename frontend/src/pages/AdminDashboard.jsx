import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Modal from '../components/Modal';
import { getAllUsers, activateUser, deactivateUser } from '../services/authService';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalUsers: 0,
    usersPerPage: 10,
  });
  const [modalState, setModalState] = useState({
    isOpen: false,
    userId: null,
    action: null,
    userName: '',
  });

  useEffect(() => {
    fetchUsers(pagination.currentPage);
  }, []);

  const fetchUsers = async (page = 1) => {
    setLoading(true);
    try {
      const response = await getAllUsers(page, 10);
      setUsers(response.data.users);
      setPagination(response.data.pagination);
    } catch (error) {
      toast.error('Failed to fetch users');
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (userId, action, userName) => {
    setModalState({
      isOpen: true,
      userId,
      action,
      userName,
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      userId: null,
      action: null,
      userName: '',
    });
  };

  const handleConfirmAction = async () => {
    const { userId, action } = modalState;
    
    try {
      if (action === 'activate') {
        await activateUser(userId);
        toast.success('User activated successfully');
      } else if (action === 'deactivate') {
        await deactivateUser(userId);
        toast.success('User deactivated successfully');
      }
      fetchUsers(pagination.currentPage);
    } catch (error) {
      const errorMessage = error.response?.data?.message || `Failed to ${action} user`;
      toast.error(errorMessage);
    } finally {
      closeModal();
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchUsers(newPage);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Filter users based on search and filters
  const filteredUsers = users.filter((user) => {
    const matchesSearch = 
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  if (loading && users.length === 0) {
    return (
      <>
        <Navbar />
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="dashboard">
        <div className="container">
          <div className="dashboard-header">
            <h1>User Management Dashboard</h1>
            <p>Manage all users in the system</p>
          </div>

          {/* Search and Filter Section */}
          <div className="filters-container" style={{ 
            background: 'rgba(255, 255, 255, 0.95)', 
            padding: '20px', 
            borderRadius: '12px', 
            marginBottom: '20px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            gap: '15px',
            flexWrap: 'wrap',
            alignItems: 'center'
          }}>
            <div className="form-group" style={{ flex: '1 1 300px', marginBottom: 0 }}>
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginBottom: 0 }}
              />
            </div>
            <div className="form-group" style={{ flex: '0 1 150px', marginBottom: 0 }}>
              <select 
                value={filterRole} 
                onChange={(e) => setFilterRole(e.target.value)}
                style={{ marginBottom: 0 }}
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
            <div className="form-group" style={{ flex: '0 1 150px', marginBottom: 0 }}>
              <select 
                value={filterStatus} 
                onChange={(e) => setFilterStatus(e.target.value)}
                style={{ marginBottom: 0 }}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            {(searchTerm || filterRole !== 'all' || filterStatus !== 'all') && (
              <button 
                className="btn btn-secondary btn-small"
                onClick={() => {
                  setSearchTerm('');
                  setFilterRole('all');
                  setFilterStatus('all');
                }}
                style={{ flex: '0 0 auto' }}
              >
                Clear Filters
              </button>
            )}
          </div>

          {filteredUsers.length === 0 ? (
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              padding: '60px 20px',
              borderRadius: '12px',
              textAlign: 'center',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{ color: '#666', marginBottom: '10px' }}>No users found</h3>
              <p style={{ color: '#999' }}>Try adjusting your search or filters</p>
            </div>
          ) : (
            <>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Created At</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.fullName}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`role-badge role-${user.role}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge status-${user.status}`}>
                        {user.status}
                      </span>
                    </td>
                    <td>{formatDate(user.createdAt)}</td>
                    <td>
                      <div className="action-buttons">
                        {user.status === 'inactive' ? (
                          <button
                            className="btn btn-success btn-small"
                            onClick={() => openModal(user.id, 'activate', user.fullName)}
                          >
                            Activate
                          </button>
                        ) : (
                          <button
                            className="btn btn-danger btn-small"
                            onClick={() => openModal(user.id, 'deactivate', user.fullName)}
                          >
                            Deactivate
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <button
              className="btn btn-secondary btn-small"
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
            >
              ← Previous
            </button>
            <span className="pagination-info">
              Page {pagination.currentPage} of {pagination.totalPages} 
              <span style={{ display: 'block', fontSize: '12px', marginTop: '4px' }}>
                Showing {filteredUsers.length} of {pagination.totalUsers} users
              </span>
            </span>
            <button
              className="btn btn-secondary btn-small"
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage === pagination.totalPages}
            >
              Next →
            </button>
          </div>
        </>
      )}
        </div>
      </div>

      <Modal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        onConfirm={handleConfirmAction}
        title={`${modalState.action === 'activate' ? 'Activate' : 'Deactivate'} User`}
        message={`Are you sure you want to ${modalState.action} ${modalState.userName}?`}
        confirmText={modalState.action === 'activate' ? 'Activate' : 'Deactivate'}
        type={modalState.action === 'activate' ? 'success' : 'danger'}
      />
    </>
  );
};

export default AdminDashboard;
