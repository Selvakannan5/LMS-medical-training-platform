import 'dotenv/config'
import mongoose from 'mongoose'
import { connectDB } from './config/db.js'
import { Notification, AIFeedback } from './models/SimpleModels.js'

async function check() {
  await connectDB()
  
  console.log('Total notifications:', await Notification.countDocuments())
  
  const allNotifs = await Notification.find().lean()
  console.log('All Notifications in DB:', JSON.stringify(allNotifs, null, 2))
  
  // Test query for learner u1
  const u1Notifs = await Notification.find({
    $or: [
      { learnerId: 'u1' },
      { learnerId: { $exists: false } },
      { learnerId: null }
    ]
  }).lean()
  console.log('Notifications matching u1:', JSON.stringify(u1Notifs, null, 2))

  // Test query for learner u3
  const u3Notifs = await Notification.find({
    $or: [
      { learnerId: 'u3' },
      { learnerId: { $exists: false } },
      { learnerId: null }
    ]
  }).lean()
  console.log('Notifications matching u3:', JSON.stringify(u3Notifs, null, 2))

  const allFeedback = await AIFeedback.find().lean()
  console.log('All AI Feedback in DB:', JSON.stringify(allFeedback, null, 2))
  
  process.exit(0)
}

check().catch(err => {
  console.error(err)
  process.exit(1)
})
