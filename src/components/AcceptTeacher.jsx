import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AcceptTeacher = ({ inviteId, onInviteAccepted }) => {
  const handleAcceptOffer = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      Swal.fire("Authentication Error", "Please log in to continue.", "error");
      return;
    }

    try {
      const response = await axios.post(
        `https://attendipen-d65abecaffe3.herokuapp.com/invites/accept_offer/${inviteId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        Swal.fire("Success", "Offer accepted successfully!", "success");
        onInviteAccepted(inviteId); // Remove accepted invite from the list
      } else {
        Swal.fire("Error", "Something went wrong. Please try again.", "error");
      }
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Failed to accept the offer.",
        "error"
      );
    }
  };

  return <button onClick={handleAcceptOffer}>Accept Invite</button>;
};

// Component to list invitations
const Invitations = ({ invites, setInvites }) => {
  const handleInviteAccepted = (inviteId) => {
    setInvites((prevInvites) =>
      prevInvites.filter((invite) => invite.id !== inviteId)
    );
  };

  return (
    <div>
      <h2>Pending Invitations</h2>
      {invites.length === 0 ? (
        <p>No pending invites</p>
      ) : (
        invites.map((invite) => (
          <div key={invite.id}>
            <p>Invitation ID: {invite.id}</p>
            <AcceptTeacher inviteId={invite.id} onInviteAccepted={handleInviteAccepted} />
          </div>
        ))
      )}
    </div>
  );
};

// Dashboard Component
const Dashboard = () => {
  const [pendingInvites, setPendingInvites] = useState([]);

  useEffect(() => {
    const fetchInvites = async () => {
      const token = localStorage.getItem("token");

      if (!token) return;

      try {
        const response = await axios.get(
          "https://attendipen-d65abecaffe3.herokuapp.com/invites/pending",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPendingInvites(response.data || []);
      } catch (error) {
        console.error("Error fetching invites:", error);
      }
    };

    fetchInvites();
  }, []);

  return (
    <div>
      <h1>Welcome to Your Dashboard</h1>
      <Invitations invites={pendingInvites} setInvites={setPendingInvites} />
    </div>
  );
};

export default Dashboard;
