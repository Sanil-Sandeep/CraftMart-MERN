import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../components/spinner';
import { Link } from 'react-router-dom';
import Header from '../../components/headerfooter/Header';
import Footer from '../../components/headerfooter/Footer';

const ChatManager = () => {
  const [cchats, setCChats] = useState([]);
  const [mchats, setMChats] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // Fetch customer chats
    axios
      .get('http://localhost:5555/cchats')
      .then((response) => {
        const sortedCChats = response.data.data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        setCChats(sortedCChats);
      })
      .catch((error) => {
        console.log(error);
      });

    // Fetch manager chats
    axios
      .get('http://localhost:5555/mchats')
      .then((response) => {
        const sortedMChats = response.data.data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        setMChats(sortedMChats);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Combine and sort chats
  const combinedChats = [
    ...cchats.map((chat) => ({ ...chat, type: 'customer' })),
    ...mchats.map((chat) => ({ ...chat, type: 'manager' })),
  ];
  const sortedChats = combinedChats.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  return (
    <div>
      <Header />
    <div style={styles.page}>
      <h1 style={{ fontSize: '36px', color: 'brown' }}>Manager</h1>
      <div style={styles.container}>
        <br /><br />

        {loading ? (
          <Spinner />
        ) : (
          <>
            {/* Combined Chats Section */}
            <div style={styles.chatSection}>
              {sortedChats.map((chat) => (
                <div key={chat._id} style={styles.chatWrapper}>
                  <div style={chat.type === 'manager' ? styles.mchatBox : styles.cchatBox}>
                    <div style={chat.type === 'manager' ? styles.mchatMessage : styles.cchatMessage}>
                      {chat.type === 'manager' ? chat.mMessage : chat.cMessage}
                    </div>
                  </div>
                  <div style={styles.actions}>
                    {chat.type === 'manager' ? (
                      <>
                      <Link to={`/mchats/edit/${chat._id}`} style={styles.link}>
                          Edit
                        </Link>
                        <Link to={`/mchats/delete/${chat._id}`} style={styles.link}>
                          Delete
                        </Link>
                        
                      </>
                    ) : (
                      <>
                        <Link to={`/cchats/reply/${chat._id}`} style={styles.replylink}>
                          Reply
                        </Link>
                      </>
                    )}
                  </div>
                  {chat.type === 'manager' && chat.mReply && (
                    <div style={styles.mReplyBox}>
                      <div style={styles.mReplyMessage}>{chat.mReply}</div>
                    </div>
                  )}
                  {chat.type === 'customer' && chat.cReply && (
                    <div style={styles.replyBox}>
                      <div style={styles.replyMessage}>{chat.cReply}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        <div style={styles.header}>
          <h1 style={styles.title}>Chat with customer...</h1>
          <Link to='/mchats/create'>
            <button style={styles.button}>Message</button>
          </Link>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
};



export default ChatManager;
