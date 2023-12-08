import React from 'react';

const NotificationThread = ({ notifications, setNotifications }) => {
    const accessToken = localStorage.getItem('accessToken');

    const deleteNotification = async (id) => {
        try {
            await fetch(`http://localhost:8000/notifications/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            // Remove the deleted notification from the state
            const updatedNotifications = notifications.filter(notification => notification.id !== id);
            setNotifications(updatedNotifications);
        } catch (error) {
            console.error('Error deleting notification:', error);
        }
    };

    const markAsRead = async (id) => {
        try {
            await fetch(`http://localhost:8000/notifications/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            // Update the notification in the state
            const updatedNotifications = notifications.map(notification => 
                notification.id === id ? { ...notification, is_read: true } : notification
            );
            setNotifications(updatedNotifications);
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    return (
        <>
            {notifications.map(notification => (
                <div key={notification.id} className="notification-wrapper mb-4">
                    <div className="notification-container">
                        <div className="col-12 col-md-6">
                        {!notification.is_read && (
                            <button 
                                className="btn btn-dark font-weight-bold p-1" 
                                onClick={() => markAsRead(notification.id)}
                            >
                                Mark as read
                            </button>
                        )}
                        </div>
                        <br />
                        <div className="col-12 col-md-6" style={{ fontWeight: notification.is_read ? 'normal' : 'bold' }}>
                            <span>{new Date(notification.created_at).toLocaleString()}</span>
                        </div>

                        <button className="delete-btn btn-bordered" onClick={() => deleteNotification(notification.id)}>&times;</button>

                        <br />
                        <p className="mb-2" style={{ fontWeight: notification.is_read ? 'normal' : 'bold' }}>
                            {notification.content_type_str} {"  "}
                            <a href={`http://localhost:8000${notification.content_object_url}`} target="_blank" rel="noopener noreferrer">
                                Click for details
                            </a>
                        </p>
                    </div>
                </div>
            ))}
        </>
    );
};

export default NotificationThread;
