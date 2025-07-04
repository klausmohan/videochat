import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";

// 🔍 Get users to recommend (excluding self and already-friends)
export async function getRecommendedUsers(req, res) {
  try {
    const currentUserId = req.user.id;
    const currentUserFriends = req.user.friends || [];

    const recommendedUsers = await User.find({
      _id: { $nin: [currentUserId, ...currentUserFriends] },
      isOnboarded: true,
    });

    res.status(200).json(recommendedUsers);
  } catch (error) {
    console.error("❌ getRecommendedUsers:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// 🧑‍🤝‍🧑 Get all friends of logged-in user
export async function getMyFriends(req, res) {
  try {
    const user = await User.findById(req.user.id)
      .select("friends")
      .populate(
        "friends",
        "fullName profilePic nativeLanguage learningLanguage"
      );

    res.status(200).json(user?.friends || []);
  } catch (error) {
    console.error("❌ getMyFriends:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// ✉️ Send friend request
export async function sendFriendRequest(req, res) {
  try {
    const myId = req.user.id;
    const { id: recipientId } = req.params;

    if (myId === recipientId) {
      return res
        .status(400)
        .json({ message: "You can't send a request to yourself." });
    }

    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({ message: "Recipient not found." });
    }

    const alreadyFriends = recipient.friends.includes(myId);
    if (alreadyFriends) {
      return res
        .status(400)
        .json({ message: "You're already friends with this user." });
    }

    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: myId, recipient: recipientId },
        { sender: recipientId, recipient: myId },
      ],
    });

    if (existingRequest) {
      return res
        .status(400)
        .json({ message: "Friend request already exists." });
    }

    const newRequest = await FriendRequest.create({
      sender: myId,
      recipient: recipientId,
    });

    res.status(201).json(newRequest);
  } catch (error) {
    console.error("❌ sendFriendRequest:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// ✅ Accept a friend request
export async function acceptFriendRequest(req, res) {
  try {
    const { id: requestId } = req.params;

    const request = await FriendRequest.findById(requestId);
    if (!request)
      return res.status(404).json({ message: "Friend request not found." });

    if (request.recipient.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized action." });
    }

    request.status = "accepted";
    await request.save();

    await User.findByIdAndUpdate(request.sender, {
      $addToSet: { friends: request.recipient },
    });

    await User.findByIdAndUpdate(request.recipient, {
      $addToSet: { friends: request.sender },
    });

    res.status(200).json({ message: "Friend request accepted." });
  } catch (error) {
    console.error("❌ acceptFriendRequest:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// 🔄 Get all incoming friend requests
export async function getFriendRequests(req, res) {
  try {
    const [incomingReqs, acceptedReqs] = await Promise.all([
      FriendRequest.find({
        recipient: req.user.id,
        status: "pending",
      }).populate(
        "sender",
        "fullName profilePic nativeLanguage learningLanguage"
      ),

      FriendRequest.find({
        sender: req.user.id,
        status: "accepted",
      }).populate("recipient", "fullName profilePic"),
    ]);

    res.status(200).json({ incomingReqs, acceptedReqs });
  } catch (error) {
    console.error("❌ getFriendRequests:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// 📤 Get all sent friend requests
export async function getOutgoingFriendReqs(req, res) {
  try {
    const outgoing = await FriendRequest.find({
      sender: req.user.id,
      status: "pending",
    }).populate(
      "recipient",
      "fullName profilePic nativeLanguage learningLanguage"
    );

    res.status(200).json(outgoing);
  } catch (error) {
    console.error("❌ getOutgoingFriendReqs:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
