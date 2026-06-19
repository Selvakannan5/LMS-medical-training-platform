import 'dotenv/config'
import bcrypt from 'bcryptjs'
import { connectDB } from './config/db.js'
import User from './models/User.js'
import Program from './models/Program.js'
import Course from './models/Course.js'
import Assessment from './models/Assessment.js'
import Enrollment from './models/Enrollment.js'
import { Certificate, Batch, Simulation, Notification } from './models/SimpleModels.js'

const password = await bcrypt.hash('MedTrain@123', 10)

const users = [
  { id: 'u1', name: 'Selvakannan M', email: 'learner@demo.com', password, role: 'learner', department: 'Emergency Medicine' },
  { id: 'f1', name: 'Dr. Suresh Kumar', email: 'faculty@demo.com', password, role: 'faculty', department: 'Pediatrics' },
  { id: 'admin1', name: 'Admin User', email: 'admin@demo.com', password, role: 'admin', department: 'Training Admin' }
]

const programs = [
  { id: 'p3', code: 'PALS', name: 'Pediatric Advanced Life Support', description: 'Approach to a sick child, ABCDE assessment, shock, respiratory failure and pediatric CPR.', duration: '14 hours', price: 2500, modules: 6, completionRate: 71, color: 'green' },
  { id: 'p4', code: 'NALS', name: 'Neonatal Advanced Life Support', description: 'Neonatal resuscitation, Golden Minute, PPV, MR SOPA, compressions and post-resuscitation care.', duration: '12 hours', price: 2200, modules: 6, completionRate: 55, color: 'amber' }
]

const courses = [
  {
    id: 'c3', programId: 'p3', name: 'PALS — Approach to a Sick Child', description: 'Evaluate, identify, intervene and reassess using PAT and ABCDE.', progress: 0,
    modules: [
      { id: 'pals-m1', title: 'Doorway Look and PAT', type: 'pdf', duration: '20 min', completed: false, locked: false, studyContent: 'Use the Pediatric Assessment Triangle in under 30 seconds without touching the child. Assess Appearance, Breathing and Colour. If all are normal, proceed calmly to ABCDE. If abnormal, start life-saving steps: position, oxygen, monitor, call for help and CPR if no pulse.', keyPoints: ['PAT = Appearance, Breathing, Colour', 'TICLS checks appearance', 'Abnormal PAT means sick child'] },
      { id: 'pals-m2', title: 'ABCDE Primary Assessment', type: 'pdf', duration: '30 min', completed: false, locked: false, studyContent: 'At every ABCDE step: assess, intervene and reassess. Airway: position, suction, OPA/NPA or advanced airway. Breathing: check RR, work of breathing, air entry, sounds and SpO2. Circulation: HR, pulses, CRT, BP, skin, temperature, urine output and mental state. Disability: AVPU, pupils and sugar. Exposure: full exam while keeping warm.', keyPoints: ['Assess → Intervene → Reassess', 'Children have large occiput; towel under shoulders', 'Always check glucose'] },
      { id: 'pals-m3', title: 'Breathing Distress vs Failure', type: 'interactive', duration: '25 min', completed: false, locked: false, studyContent: 'Respiratory distress shows increased RR and work of breathing while the child is still alert and oxygen improves saturation. Respiratory failure shows low or irregular RR, drowsiness, poor air entry and SpO2 not improving even with oxygen. Failure requires BMV and possible intubation.', keyPoints: ['Failure = altered consciousness + poor oxygenation', 'BMV rate: 1 breath every 2–3 seconds', 'Hypoxia is the commonest pediatric arrest cause'] },
      { id: 'pals-m4', title: 'Shock Recognition and Management', type: 'pdf', duration: '30 min', completed: false, locked: false, studyContent: 'Hypotension is a late sign in children. Compensated shock has tachycardia, weak peripheral pulses, delayed CRT and normal BP. Hypotensive shock has low BP, weak or absent pulses, mottling and drowsiness. Treat shock based on type: hypovolaemic, distributive, cardiogenic or obstructive.', keyPoints: ['Normal BP does not exclude shock', 'Sepsis: fluids + antibiotics + vasoactive support if needed', 'Cardiogenic shock needs slow, low-volume fluids'] },
      { id: 'pals-m5', title: 'High-Quality Pediatric CPR', type: 'video', duration: '20 min', completed: false, locked: false, studyContent: 'High-quality CPR rate is 100–120/min. Compression depth is at least 4 cm in infants and at least 5 cm in children, about one-third AP chest diameter. Compression:ventilation ratio is 30:2 for one rescuer and 15:2 for two rescuers. Minimize interruptions to less than 10 seconds.', keyPoints: ['Rate 100–120/min', '15:2 with two rescuers', 'Minimize pauses'] },
      { id: 'pals-m6', title: 'PALS One-Page Algorithm', type: 'pdf', duration: '15 min', completed: false, locked: false, studyContent: 'Doorway look with PAT, decide sick or stable, complete ABCDE, take SAMPLE history, start CPR if arrest, classify rhythm as shockable or non-shockable, treat 5 Hs and 5 Ts, then provide post-ROSC care targeting SpO2 94–99%, normal BP, no fever and seizure control.', keyPoints: ['Evaluate → Identify → Intervene → Reassess', 'Shockable: defibrillate 2 J/kg then 4 J/kg', 'Adrenaline 0.01 mg/kg every 3–5 min'] }
    ]
  },
  {
    id: 'c4', programId: 'p4', name: 'NALS — Neonatal Resuscitation', description: 'Golden Minute, PPV, MR SOPA, neonatal compressions, medications and post-resuscitation care.', progress: 0,
    modules: [
      { id: 'nals-m1', title: 'Before the Baby Arrives', type: 'pdf', duration: '20 min', completed: false, locked: false, studyContent: 'Prepare before delivery. Ask four questions: term, tone, breathing/crying and clear fluid. Identify risks such as preterm, meconium, fetal distress, multiple birth and infection. Check warmer, suction, bag, oxygen and clock. Assign team roles.', keyPoints: ['Risk assess before birth', 'Warm, airway, breathing, check and drug equipment ready', 'One person dedicated to baby'] },
      { id: 'nals-m2', title: 'The Golden Minute', type: 'interactive', duration: '25 min', completed: false, locked: false, studyContent: 'Within 60 seconds complete initial steps and start ventilation if needed. If term, good tone and breathing/crying, keep with mother. If not, move to warmer and do warm, position, clear airway if obstructed, dry, stimulate and reposition. At 30 seconds check breathing and heart rate.', keyPoints: ['Initial steps happen together', 'Start PPV if apnoea/gasping or HR <100', 'Do not wait for Apgar'] },
      { id: 'nals-m3', title: 'Positive Pressure Ventilation', type: 'video', duration: '30 min', completed: false, locked: false, studyContent: 'PPV is the single most important step. Use mask seal over mouth and nose, rate 40–60/min, starting pressure 20–25 cm H2O and titrated oxygen. Monitor chest rise, right-hand SpO2 and HR. Reassess every 30 seconds.', keyPoints: ['Good ventilation saves most babies', 'Right hand = pre-ductal SpO2', 'Term starts 21% oxygen; preterm starts 21–30%'] },
      { id: 'nals-m4', title: 'MR SOPA Corrective Steps', type: 'pdf', duration: '20 min', completed: false, locked: false, studyContent: 'If chest is not rising during PPV, use MR SOPA in order: Mask adjust, Reposition airway, Suction mouth and nose, Open mouth, Pressure increase and Airway alternative such as intubation or LMA.', keyPoints: ['Air leak is commonest PPV failure', 'Mouth before nose suction', 'Do not move on until chest rises'] },
      { id: 'nals-m5', title: 'Chest Compressions and Medications', type: 'pdf', duration: '30 min', completed: false, locked: false, studyContent: 'If HR remains below 60 after 30 seconds of effective PPV, intubate if possible, increase oxygen to 100%, start chest compressions with 3:1 ratio and place UVC. If HR remains below 60 after 60 seconds of compressions plus PPV, give adrenaline 1:10,000 at 0.1–0.3 mL/kg IV/IO and repeat every 3–5 minutes.', keyPoints: ['Compression ratio 3:1', '90 compressions + 30 breaths = 120 events/min', 'UVC is quickest IV access'] },
      { id: 'nals-m6', title: 'Special Situations and Post-Resus Care', type: 'pdf', duration: '25 min', completed: false, locked: false, studyContent: 'For meconium, routine tracheal suction is not recommended; prioritize PPV if non-vigorous. Preterm babies need plastic wrap, hat, possible thermal mattress, PEEP and careful oxygen. Post-resus care includes warmth, sugar checks, SpO2 90–95%, HIE monitoring, NICU review and parent communication.', keyPoints: ['Meconium: intubate only if obstructed', 'Preterm babies lose heat fast', 'Watch for HIE after prolonged PPV or compressions'] }
    ]
  }
]

const assessments = [
  {
    id: 'nals-pretest', courseId: 'c4', type: 'pre-test', title: 'NALS MCQs — Pretest', timeLimit: 20, questions: [
      { id: 'nq1', text: 'Approximately what proportion of newborns require active resuscitative support at birth?', options: ['Around 1% of all newborns', 'Around 5% of all newborns', 'Around 10% of all newborns', 'Around 25% of all newborns'], correct: 2 },
      { id: 'nq2', text: 'Which physiological change primarily occurs when a newborn takes the first effective breath?', options: ['Pulmonary vessels constrict reducing blood flow', 'Lung fluid is absorbed and air fills alveoli', 'Systemic vascular resistance decreases rapidly', 'Ductus arteriosus closes immediately after birth'], correct: 1 },
      { id: 'nq3', text: 'A newborn is floppy and not crying immediately after delivery. What is the most appropriate initial step?', options: ['Begin chest compressions without delay', 'Provide positive pressure ventilation immediately', 'Position airway and provide tactile stimulation', 'Administer intravenous epinephrine urgently'], correct: 2 },
      { id: 'nq4', text: 'Which heart rate threshold indicates the need for chest compressions in a newborn?', options: ['Heart rate <120 beats/min', 'Heart rate <100 beats/min', 'Heart rate <80 beats/min', 'Heart rate <60 beats/min'], correct: 3 },
      { id: 'nq5', text: 'After initiating positive pressure ventilation, no chest rise is observed. What is the next appropriate action?', options: ['Increase oxygen concentration to 100% immediately', 'Start chest compressions without further assessment', 'Perform corrective steps using MRSOPA sequence', 'Administer epinephrine 0.1 mg/kg intravenously'], correct: 2 },
      { id: 'nq6', text: 'What is the correct compression-to-ventilation ratio during neonatal resuscitation?', options: ['3 compressions followed by 1 ventilation', '15 compressions followed by 2 ventilations', '30 compressions followed by 2 ventilations', '5 compressions followed by 1 ventilation'], correct: 0 },
      { id: 'nq7', text: 'A newborn has a heart rate of 80/min after initial resuscitation steps. What is the next best step?', options: ['Continue positive pressure ventilation and reassess', 'Start chest compressions with coordinated ventilation', 'Administer epinephrine 0.01 mg/kg intravenously', 'Stop intervention and observe for recovery'], correct: 0 },
      { id: 'nq8', text: 'What is the recommended IV dose of epinephrine in neonatal resuscitation (1:10,000)?', options: ['0.01–0.03 ml/kg via intravenous route', '0.1–0.3 ml/kg via intravenous route', '1–3 ml/kg via intravenous route', '3–5 ml/kg via intravenous route'], correct: 1 },
      { id: 'nq9', text: 'Despite adequate ventilation and compressions, HR remains <60/min. What should be done next?', options: ['Continue ventilation alone for another 60 sec', 'Administer epinephrine and consider fluid bolus', 'Stop resuscitation after 2 min of efforts', 'Increase ventilation rate to 80 breaths/min'], correct: 1 },
      { id: 'nq10', text: 'What is the recommended dose for volume expansion during neonatal resuscitation?', options: ['5 ml/kg of isotonic saline bolus', '10 ml/kg of isotonic saline bolus', '20 ml/kg of isotonic saline bolus', '30 ml/kg of isotonic saline bolus'], correct: 1 }
    ]
  },
  {
    id: 'pals-pretest', courseId: 'c3', type: 'pre-test', title: 'PALS MCQs — Pretest', timeLimit: 30, questions: [
      { id: 'pq1', text: 'What is the most appropriate primary goal of PALS in an emergency setting?', options: ['Provide definitive diagnosis before initiating treatment', 'Rapidly recognize deterioration and provide early intervention', 'Perform detailed secondary assessment before intervention', 'Stabilize patient only after diagnostic confirmation'], correct: 1 },
      { id: 'pq2', text: 'Which sequence best represents the systematic PALS approach?', options: ['Diagnose → Treat → Reassess → Discharge', 'Evaluate → Identify → Intervene → Reassess', 'Observe → Investigate → Treat → Refer', 'Airway → Drugs → Circulation → Evaluation'], correct: 1 },
      { id: 'pq3', text: 'The Pediatric Assessment Triangle (PAT) is primarily used to:', options: ['Perform detailed neurological examination in children', 'Obtain baseline vital signs before intervention', 'Rapidly assess severity without touching the child', 'Identify metabolic abnormalities during illness'], correct: 2 },
      { id: 'pq4', text: 'A child appears irritable, has poor eye contact, and weak cry. Which PAT component is most affected?', options: ['Breathing component indicating airway compromise', 'Circulation component indicating poor perfusion', 'Appearance component indicating neurological status', 'Disability component indicating glucose abnormality'], correct: 2 },
      { id: 'pq5', text: '“TICLS” assessment in PAT primarily evaluates which parameter?', options: ['Circulation through capillary refill time', 'Appearance reflecting neurological function', 'Airway patency and obstruction level', 'Breathing effort and oxygenation status'], correct: 1 },
      { id: 'pq6', text: 'A child presents with nasal flaring, intercostal retractions, and grunting. This indicates:', options: ['Normal respiratory adaptation in mild illness', 'Increased work of breathing with distress', 'Primary circulatory failure without respiratory issue', 'Neurological suppression affecting respiration'], correct: 1 },
      { id: 'pq7', text: 'Which respiratory rate is considered abnormal in a 3-year-old child?', options: ['Respiratory rate less than 20 breaths/min', 'Respiratory rate less than 30 breaths/min', 'Respiratory rate greater than 40 breaths/min', 'Respiratory rate equal to 25 breaths/min'], correct: 2 },
      { id: 'pq8', text: 'A child has SpO₂ not improving despite 100% oxygen and shows altered consciousness. This suggests:', options: ['Mild respiratory distress with compensation', 'Respiratory failure requiring advanced airway', 'Stable respiratory pattern with observation', 'Circulatory shock without respiratory cause'], correct: 1 },
      { id: 'pq9', text: 'Which clinical feature best differentiates respiratory failure from respiratory distress?', options: ['Increased respiratory rate with nasal flaring', 'Retractions with normal oxygen saturation', 'Inability to maintain SpO₂ despite oxygen', 'Audible wheeze with preserved consciousness'], correct: 2 },
      { id: 'pq10', text: 'A child has weak peripheral pulses, delayed CRT, and normal BP. What is the most likely diagnosis?', options: ['Adequate circulation with normal perfusion', 'Compensated shock with preserved blood pressure', 'Hypotensive shock requiring immediate vasopressors', 'Cardiogenic shock with pulmonary congestion'], correct: 1 },
      { id: 'pq11', text: 'What is the correct systolic BP cutoff for hypotension in a 6-year-old child?', options: ['Less than 60 mmHg systolic pressure', 'Less than 70 mmHg systolic pressure', 'Less than 70 + (2 × age) mmHg', 'Less than 90 mmHg systolic pressure'], correct: 2 },
      { id: 'pq12', text: 'A child in septic shock has bounding pulses, warm extremities, and flash CRT. What is the most appropriate initial intervention?', options: ['Restrict fluids and start diuretics immediately', 'Administer oxygen and give fluid bolus 10–20 ml/kg', 'Start chest compressions due to instability', 'Delay fluids and give antibiotics only'], correct: 1 },
      { id: 'pq13', text: 'If shock persists after adequate fluid resuscitation, what is the next best step?', options: ['Continue repeated fluid boluses without limitation', 'Initiate vasoactive medications for support', 'Stop fluids and observe for spontaneous recovery', 'Provide oxygen therapy alone without escalation'], correct: 1 },
      { id: 'pq14', text: 'A child is unresponsive with blood glucose 50 mg/dl. What is the appropriate management?', options: ['Administer 10% dextrose 2 ml/kg intravenously', 'Administer 25% dextrose 2 ml/kg intravenously', 'Administer 50% dextrose 1 ml/kg intravenously', 'Administer oral glucose immediately'], correct: 1 },
      { id: 'pq15', text: 'What is the recommended chest compression rate during high-quality pediatric CPR?', options: ['80–100 compressions per minute', '90–110 compressions per minute', '100–120 compressions per minute', '120–140 compressions per minute'], correct: 2 },
      { id: 'pq16', text: 'A child presents with decreased air entry on one side, hypotension, and distended neck veins. What is the most likely diagnosis?', options: ['Severe bronchospasm causing lower airway obstruction', 'Tension pneumothorax causing obstructive shock', 'Cardiogenic shock due to myocardial dysfunction', 'Septic shock with distributive physiology'], correct: 1 },
      { id: 'pq17', text: 'A child has altered consciousness, shallow breathing, and irregular respiratory pattern. What is the most likely underlying problem?', options: ['Upper airway obstruction requiring suction', 'Lower airway obstruction requiring bronchodilators', 'Lung parenchymal disease requiring antibiotics', 'Disordered control of breathing requiring ventilation'], correct: 3 },
      { id: 'pq18', text: 'A child with suspected septic shock has received 40 ml/kg fluids but still shows poor perfusion. What is the next best step?', options: ['Continue repeated fluid boluses up to 80 ml/kg', 'Start vasoactive drugs such as noradrenaline', 'Stop fluids and observe for spontaneous recovery', 'Administer diuretics to prevent fluid overload'], correct: 1 },
      { id: 'pq19', text: 'Which of the following findings best suggests hypotensive shock in children?', options: ['Normal blood pressure with delayed CRT', 'Tachycardia with bounding peripheral pulses', 'Systolic BP less than age-appropriate cutoff', 'Warm extremities with flash capillary refill'], correct: 2 },
      { id: 'pq20', text: 'During CPR, interruptions in chest compressions are minimized to less than 10 seconds primarily to:', options: ['Prevent fatigue of the rescuer during resuscitation', 'Maintain adequate coronary and cerebral perfusion', 'Allow time for ventilation and airway adjustment', 'Improve oxygen delivery through increased ventilation'], correct: 1 }
    ]
  }
]

const enrollments = [
  { id: 'e1', learnerId: 'u1', courseId: 'c3', progress: 0, nextModule: 'Doorway Look and PAT', enrolledAt: '2026-06-19', status: 'in_progress' },
  { id: 'e2', learnerId: 'u1', courseId: 'c4', progress: 0, nextModule: 'Before the Baby Arrives', enrolledAt: '2026-06-19', status: 'in_progress' }
]

const certificates = []
const batches = [{ id: 'b1', name: 'Emergency Care Demo Batch', programId: 'p3', startDate: '2026-06-19', endDate: '2026-07-05', maxSeats: 20, enrolledCount: 1, faculty: ['f1'], status: 'active', learners: ['u1'] }]
const simulations = [{ id: 's1', scenario: 'Pediatric Respiratory Failure', batchId: 'b1', date: '2026-06-25', time: '10:00', room: 'Sim Lab A', faculty: 'f1', status: 'scheduled' }]
const notifications = [{ id: 'n1', type: 'course', message: 'NALS and PALS demo courses are available.', read: false, createdAt: new Date().toISOString() }]

await connectDB()
await Promise.all([User.deleteMany(), Program.deleteMany(), Course.deleteMany(), Assessment.deleteMany(), Enrollment.deleteMany(), Certificate.deleteMany(), Batch.deleteMany(), Simulation.deleteMany(), Notification.deleteMany()])
await User.insertMany(users)
await Program.insertMany(programs)
await Course.insertMany(courses)
await Assessment.insertMany(assessments)
await Enrollment.insertMany(enrollments)
await Certificate.insertMany(certificates)
await Batch.insertMany(batches)
await Simulation.insertMany(simulations)
await Notification.insertMany(notifications)
console.log('Database seeded successfully')
console.log('Login: learner@demo.com / MedTrain@123')
console.log('Assessments: /api/assessments/nals-pretest and /api/assessments/pals-pretest')
process.exit(0)
