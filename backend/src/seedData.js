// Detailed Medical Training Curriculum Data for all 6 courses

export const programs = [
  { id: 'p1', code: 'BLS', name: 'Basic Life Support', description: 'Fundamental CPR, AED, and choking relief techniques for adults, children, and infants.', duration: '8 hours', price: 1500, modules: 6, completionRate: 85, color: 'blue' },
  { id: 'p2', code: 'ACLS', name: 'Advanced Cardiovascular Life Support', description: 'Advanced emergency care for cardiac arrest, symptomatic arrhythmias, and stroke.', duration: '16 hours', price: 3000, modules: 6, completionRate: 75, color: 'red' },
  { id: 'p3', code: 'PALS', name: 'Pediatric Advanced Life Support', description: 'Approach to sick children, pediatric CPR, respiratory failure, and pediatric shock.', duration: '14 hours', price: 2500, modules: 6, completionRate: 71, color: 'green' },
  { id: 'p4', code: 'NALS', name: 'Neonatal Advanced Life Support', description: 'Neonatal resuscitation, Golden Minute, positive pressure ventilation, and compressions.', duration: '12 hours', price: 2200, modules: 6, completionRate: 65, color: 'amber' },
  { id: 'p5', code: 'ATLS', name: 'Advanced Trauma Life Support', description: 'Systematic approach to evaluating and stabilizing major trauma and shock victims.', duration: '18 hours', price: 3500, modules: 6, completionRate: 60, color: 'slate' },
  { id: 'p6', code: 'BLSO', name: 'Basic Life Support in Obstetrics', description: 'Management of normal labor, postpartum hemorrhage, shoulder dystocia, and maternal CPR.', duration: '10 hours', price: 1800, modules: 6, completionRate: 80, color: 'purple' }
]

export const courses = [
  // BLS Course
  {
    id: 'c1',
    programId: 'p1',
    name: 'BLS — Basic Life Support / Cardiopulmonary Resuscitation',
    description: 'Healthcare-provider focused BLS course covering cardiac arrest recognition, high-quality CPR, rescue breathing, AED use, and special situations.',
    progress: 0,
    preTestId: 'bls-pretest',
    postTestId: 'bls-posttest',
    modules: [
      {
        id: 'bls-m1',
        title: 'Introduction to Cardiac Arrest & BLS',
        type: 'reading',
        duration: '15 min',
        completed: false,
        locked: true,
        learningObjectives: 'Understand cardiac arrest physiology, identify the In-Hospital/Out-of-Hospital Chain of Survival, recognize cardiac arrest signs, and verify responsiveness, breathing, and pulse within 10 seconds.',
        studyContent: 'What is Cardiac Arrest?\nCardiac arrest occurs when the heart suddenly stops pumping blood. This halts oxygenated blood flow to the brain and other vital organs, leading to unconsciousness and death within minutes if untreated. Unlike a heart attack (which is a circulation issue), cardiac arrest is an electrical issue where the heart rhythm becomes disorganized and fails.\n\nChain of Survival (6 Links):\n1. Early Recognition and Activation: Check the victim, shout for help, call EMS, and fetch the AED.\n2. High-Quality CPR: Deliver immediate chest compressions to maintain coronary and cerebral perfusion.\n3. Rapid Defibrillation: Use an AED immediately to restore a normal heart rhythm.\n4. Advanced Life Support: Professional medical care, vascular access, and medications.\n5. Post-Cardiac Arrest Care: Hospital management to stabilize brain and heart function.\n6. Recovery: Long-term physical and emotional support.\n\nSigns of Cardiac Arrest:\n- Unresponsiveness: The patient does not react to shouting or shoulder tapping.\n- No Breathing or Only Gasping: Agonal breathing is abnormal gasping and is a sign of cardiac arrest.\n- No Pulse: Carotid pulse is absent (check for no more than 10 seconds).',
        clinicalScenario: 'You are walking in the hospital lobby when a 65-year-old visitor suddenly collapses. You verify scene safety, approach the visitor, tap their shoulders and shout, "Are you okay?" The visitor does not respond. You shout at a bystander to call for help and retrieve the nearest AED. You simultaneously check the carotid pulse and scan the chest for rise. In less than 10 seconds, you confirm the patient is not breathing and has no pulse. You immediately start chest compressions.',
        algorithm: 'COLLAPSE -> Verify Scene Safety -> Tap & Shout -> Unresponsive -> Shout for Help/AED -> Check Pulse & Breathing (<10s) -> No pulse/breathing -> START CPR (30:2) -> Defibrillate with AED ASAP.',
        commonMistakes: '1. Delaying CPR to look for a pulse for more than 10 seconds.\n2. Treating agonal gasps/sighs as normal breathing and withholding CPR.\n3. Rushing to touch the patient before verifying scene safety.',
        safetyTips: '1. Never touch the patient while the AED is analyzing or delivering a shock.\n2. Always double-check scene safety first, especially in cases of electrocution, fire, or toxic spills.',
        keyPoints: [
          'Cardiac arrest is an electrical failure of the heart causing loss of pumping action.',
          'Always check responsiveness, breathing, and pulse simultaneously for no more than 10 seconds.',
          'Agonal gasps are a sign of cardiac arrest; start CPR immediately.',
          'Early CPR and rapid AED use can double or triple survival chances.'
        ],
        summary: 'Cardiac arrest is a medical emergency requiring rapid intervention. Follow the Chain of Survival: verify scene safety, check responsiveness, call for help, check pulse/breathing within 10 seconds, and start high-quality CPR (30 compressions to 2 breaths) immediately while waiting for an AED.'
      },
      {
        id: 'bls-m2',
        title: 'High-Quality Chest Compressions',
        type: 'reading',
        duration: '20 min',
        completed: false,
        locked: true,
        learningObjectives: 'Perform high-quality chest compressions on adults, maintaining proper hand and body positioning, depth, rate, full chest recoil, and minimizing interruptions.',
        studyContent: 'High-quality chest compressions are the core of CPR, generating blood flow to the heart muscle and brain.\n\nCompressions Standards:\n- Rate: 100 to 120 compressions per minute.\n- Depth: At least 2 inches (5 cm) but not exceeding 2.4 inches (6 cm) for adults.\n- Recoil: Allow full chest recoil after each compression. Do not lean on the chest between compressions, as this prevents the heart chambers from refilling with blood.\n- Hand Position: Place the heel of one hand on the center of the chest (lower half of the breastbone/sternum) and the other hand on top, interlocking your fingers.\n- Body Position: Kneel next to the patient, lock your elbows, and position your shoulders directly over your hands. Use your upper body weight (not just arm muscle) to push down.\n- Compression-to-Ventilation Ratio: 30 compressions followed by 2 breaths for single-rescuer adult CPR.\n- Minimize Interruptions: Limit pauses in compressions to less than 10 seconds.',
        clinicalScenario: 'You are performing single-rescuer CPR on an adult patient. You place the patient on a firm floor, stack your shoulders over their sternum, and compress at a rate of 110/min at a depth of 2.2 inches. You ensure your hands lift slightly after each compression to allow complete chest rise, and count out loud: "1, 2, 3... 30". You then open the airway, deliver 2 breaths, and resume compressions in under 8 seconds.',
        algorithm: 'Position Patient on Firm Surface -> Interlock Hands on Center of Chest -> Keep Arms Straight -> Compress 2-2.4 inches at 100-120/min -> Allow Complete Recoil -> Minimize Pauses to <10 seconds -> Switch Compressors every 2 minutes.',
        commonMistakes: '1. Leaning on the chest between compressions, preventing the heart from refilling.\n2. Pushing too shallow (<2 inches) or pushing too slowly (<100/min).\n3. Bending the elbows, which causes fatigue and reduces compression depth.',
        safetyTips: '1. Compress on a firm surface. Resuscitating on a soft mattress significantly reduces compression depth.\n2. Rib fractures are common. If you hear or feel crackling, do not stop; maintain proper hand position and continue compressions.',
        keyPoints: [
          'Compress at 100-120 bpm and 2-2.4 inches deep.',
          'Allow full chest recoil between compressions.',
          'Minimize interruptions to less than 10 seconds.',
          'Switch compressors every 2 minutes to prevent rescuer fatigue.'
        ],
        summary: 'To perform effective chest compressions, place the heel of your hand on the lower half of the sternum, lock your elbows, and push hard (2-2.4 inches) and fast (100-120/min) using your upper body weight. Let the chest recoil fully and minimize compression pauses.'
      },
      {
        id: 'bls-m3',
        title: 'Rescue Breathing & Airway Management',
        type: 'reading',
        duration: '20 min',
        completed: false,
        locked: true,
        learningObjectives: 'Perform airway opening maneuvers (head tilt-chin lift and jaw thrust), use pocket masks and bag-mask devices, and deliver effective rescue breathing.',
        studyContent: 'Opening the Airway:\n- Head Tilt-Chin Lift: Lift the chin while pushing back on the forehead. Used when no head/neck trauma is suspected.\n- Jaw Thrust: Place fingers behind the angles of the lower jaw and lift. Used when a spinal cord or neck injury is suspected, as it keeps the neck neutral.\n\nRescue Breathing Devices:\n- Pocket Mask: Fits over the patient\'s nose and mouth. Ensure a tight seal using the hand closest to the forehead.\n- Bag-Mask Ventilation: Consists of a ventilation bag attached to a face mask. Place the mask over the nose and mouth, using the "E-C clamp" technique (thumb and index finger form a C to seal, other three fingers form an E under the jaw to lift the airway).\n\nRescue Breathing Guidelines:\n- Give 1 breath every 6 seconds (10 breaths per minute) for adults when pulse is present but breathing is absent.\n- Deliver each breath over 1 second, checking for visible chest rise. Avoid hyperventilation.',
        clinicalScenario: 'A victim is pulled from a lake, unresponsive. You verify a carotid pulse is present, but the victim is not breathing. You use a pocket mask, perform a head tilt-chin lift, seal the mask, and deliver one breath over 1 second. You notice the chest rises. You wait 6 seconds and deliver the next breath, continuing rescue breathing at 10 breaths/min.',
        algorithm: 'Assess Pulse/Breathing -> Pulse Present but No Breathing -> Open Airway (Head tilt-chin lift / Jaw thrust) -> Apply Pocket Mask/Bag-Mask -> Deliver 1 breath over 1 second -> Reassess every 2 minutes.',
        commonMistakes: '1. Hyperventilating the patient (delivering breaths too quickly or forcefully), causing gastric inflation and vomiting.\n2. Failing to create a tight seal on the mask, causing air leaks.\n3. Hyperextending the neck in infants or suspected trauma patients.',
        safetyTips: '1. Use personal protective equipment (PPE) like one-way valve pocket masks to avoid contact with secretions.\n2. If the chest does not rise, reposition the head and re-attempt to open the airway.',
        keyPoints: [
          'Open airway with head tilt-chin lift (medical) or jaw thrust (trauma).',
          'Use the E-C clamp technique to hold the bag-mask seal.',
          'Each breath should last 1 second and cause visible chest rise.',
          'Deliver 1 breath every 6 seconds if pulse is present but patient is apneic.'
        ],
        summary: 'Effective ventilation requires opening the airway and sealing the ventilation device. For patients with a pulse but no breathing, deliver 1 breath over 1 second every 6 seconds, avoiding hyperventilation.'
      },
      {
        id: 'bls-m4',
        title: 'Automated External Defibrillator AED',
        type: 'reading',
        duration: '15 min',
        completed: false,
        locked: true,
        learningObjectives: 'Operate an AED safely, place pads correctly on adults and children, identify shockable vs. non-shockable rhythms, and resume CPR immediately.',
        studyContent: 'An Automated External Defibrillator (AED) is a portable device that analyzes the heart\'s rhythm and delivers an electrical shock if necessary to restore normal conduction.\n\nAED Operation Steps:\n1. Turn ON the AED immediately as soon as it arrives.\n2. Apply pads to the bare chest:\n   - Adult pad placement: Upper right chest (below collarbone) and lower left chest (side of nipple).\n   - Child/infant pad placement: Use pediatric pads if available. Place on front of chest and back (anteroposterior) if pads would touch.\n3. Clear the patient while the AED analyzes the rhythm.\n4. If a shock is advised, declare "Clear!", verify no one is touching the patient, and press the Shock button.\n5. Immediately resume chest compressions starting with compressions.\n\nShockable Rhythms:\n- Ventricular Fibrillation (VF) and Pulseless Ventricular Tachycardia (pVT).\nNon-Shockable Rhythms:\n- Asystole (flatline) and Pulseless Electrical Activity (PEA). The AED will instruct to resume CPR without shocking.',
        clinicalScenario: 'While you are doing CPR, a colleague arrives with the AED. You continue compressions while they turn the AED on and attach the pads. The AED instructs, "Analyzing heart rhythm. Do not touch the patient." You clear the patient. The AED announces, "Shock advised. Charging. Stand clear." You look and say, "I am clear, you are clear, everyone is clear." Your colleague presses the shock button. You immediately resume chest compressions.',
        algorithm: 'AED Arrives -> Turn ON AED -> Apply Pads to Bare Chest -> Plug in connector -> "Analyzing rhythm - Stand Clear" -> If shock advised -> Clear patient -> Press Shock -> Resume CPR starting with compressions.',
        commonMistakes: '1. Delaying chest compressions while preparing the AED.\n2. Touching the patient during analysis (disturbs the reading) or during shock (electric hazard).\n3. Placing pads over a pacemaker (bulge under skin) or directly onto a wet chest.',
        safetyTips: '1. Wipe the chest dry if wet before placing pads.\n2. Remove medication patches using gloves and wipe the area clean before placing pads.\n3. Ensure the patient is not lying in water or conductive puddles.',
        keyPoints: [
          'Power on the AED immediately upon arrival.',
          'Standard pad placement is upper-right and lower-left chest.',
          'Always shout "CLEAR!" and look at the patient before delivering a shock.',
          'Resume compressions immediately after the shock is delivered.'
        ],
        summary: 'The AED is critical to survival. Turn it on, apply the pads, stand clear during analysis and shock, and resume CPR immediately after shock delivery.'
      },
      {
        id: 'bls-m5',
        title: 'BLS for Special Situations',
        type: 'reading',
        duration: '20 min',
        completed: false,
        locked: true,
        learningObjectives: 'Adapt BLS guidelines to handle special resuscitation situations including drowning, opioid overdose, choking, pregnancy, trauma, and hypothermia.',
        studyContent: 'Resuscitation adjustments for specific scenarios:\n- Drowning: The primary issue is oxygen deprivation. Give 5 rescue breaths first, then begin cycles of 30:2 CPR. If in water, give rescue breaths only; do not attempt compressions until on a firm surface.\n- Opioid Overdose: Check pulse and breathing. If pulse is felt but breathing is absent, give rescue breathing and administer Naloxone (Narcan) intranasally or intramuscularly.\n- Choking (Foreign Body Airway Obstruction):\n  - Conscious adult/child: Perform abdominal thrusts (Heimlich maneuver) just above the navel.\n  - Infant: Give 5 back blows followed by 5 chest thrusts.\n  - Unconscious patient: Start CPR. Each time you open the airway to give breaths, look into the mouth and remove the object if visible. Never perform blind finger sweeps.\n- Pregnancy: Perform manual Left Uterine Displacement (LUD) to push the uterus to the left, relieving pressure on the vena cava. Position compressions slightly higher on the sternum.\n- Trauma: Use jaw thrust for airway. Restrict neck movement.\n- Hypothermia: Do not declare dead until warm. Handle gently, as rough movement can trigger VF.',
        clinicalScenario: 'You find a victim unresponsive next to empty pill bottles. They are not breathing but have a slow pulse. You shout for help, call EMS, and initiate rescue breathing (1 breath/6s). Another colleague arrives with Naloxone and administers 4mg intranasally. Within 3 minutes, the patient begins breathing on their own.',
        algorithm: 'Assess Patient -> Identify Special Situation -> (Pregnancy -> LUD | Choking -> Thrusts/Blows | Drowning -> 5 breaths first | Opioids -> Naloxone) -> Adapt CPR/defibrillation protocols accordingly.',
        commonMistakes: '1. Performing abdominal thrusts on a pregnant or obese patient (use chest thrusts instead).\n2. Doing blind finger sweeps in a choking patient, which can push the foreign body deeper.\n3. Delayed administration of Naloxone in suspected opioid arrest.',
        safetyTips: '1. Wear protective gloves when handling suspected drug overdose patients to avoid accidental opioid absorption.\n2. Ensure the drowning victim is dried on the chest before using AED pads.',
        keyPoints: [
          'Drowning CPR starts with 5 rescue breaths.',
          'Give Naloxone immediately in suspected opioid-associated emergencies.',
          'For choking, never do blind finger sweeps; only remove visible objects.',
          'Perform manual left uterine displacement (LUD) in pregnant patients.'
        ],
        summary: 'Special situations require quick adaptations. Use left uterine displacement for pregnant patients, give rescue breaths first for drowning, administer Naloxone for opioid overdoses, and perform back blows/chest thrusts for choking infants.'
      },
      {
        id: 'bls-m6',
        title: 'Practical Skills and Simulation',
        type: 'reading',
        duration: '20 min',
        completed: false,
        locked: true,
        learningObjectives: 'Demonstrate competency in practical skills using checklist workflows, allocate team roles, run simulation scenarios, and debrief performance.',
        studyContent: 'Practical CPR competency is achieved through hands-on practice, simulated code scenarios, and team coordination.\n\nCPR Practice Checklist:\n- Scene safety verified.\n- Responsiveness checked by tapping and shouting.\n- EMS activated and AED requested.\n- Pulse and breathing checked simultaneously (<10s).\n- Chest compressions started immediately (rate 100-120/min, depth 2-2.4 in, complete recoil).\n- Proper E-C clamp technique for mask ventilation.\n- Switch compressors every 2 minutes with minimal lag (<5s).\n\nAED Practice Checklist:\n- AED turned on immediately.\n- Pads applied correctly to bare skin.\n- Stand clear announced during analysis and shock.\n- Compressions resumed immediately after shock.\n\nResuscitation Team Roles:\n- Team Leader: Directs the code, keeps track of time, assigns roles, and coordinates communication.\n- Compressor: Performs high-quality chest compressions.\n- Airway Manager: Operates pocket mask/bag-mask, secures airway.\n- Monitor/Defibrillator: Plugs in and controls the AED/defibrillator.\n- Medication Handler: Prepares and gives medications (ACLS/PALS).\n- Recorder: Logs times of shocks, medications, and assessments.',
        clinicalScenario: 'You participate in a code simulation. You are assigned as the Compressor, another nurse as the Airway Manager, and a doctor as the Team Leader. The simulator patient collapses. You check pulse/breathing, call for the AED, and start compressions. The team leader directs the second nurse to prepare the bag-mask. The AED is connected, a shock is delivered, and you resume compressions instantly. The leader monitors your rate and depth on the feedback device, advising you to compress slightly deeper. After 2 minutes, you switch roles smoothly.',
        algorithm: 'Assign Roles -> Begin Simulation -> Run Skill Checklists -> Monitor Feedback Metrics -> Conclude Case -> Perform Structured Debriefing.',
        commonMistakes: '1. Lack of clear closed-loop communication (e.g., failing to repeat orders back to the Team Leader).\n2. Chaos during role switching, causing compression interruptions longer than 10 seconds.\n3. Neglecting to perform a structured debriefing after the simulation.',
        safetyTips: '1. Use feedback manikins to measure actual compression depth and rate.\n2. Ensure all participants stand completely back from the simulator during actual shock delivery.',
        keyPoints: [
          'Teamwork requires closed-loop communication and clear role allocation.',
          'Minimize handoff pauses during compressor switches.',
          'Always conduct a structured debriefing: discuss what went well, what failed, and key clinical takeaways.'
        ],
        summary: 'Successful resuscitation relies on hands-on practical mastery and coordination. Practice using standard checklists, define distinct team roles, and use post-simulation debriefing to optimize performance.'
      }
    ]
  },
  // ACLS Course
  {
    id: 'c2',
    programId: 'p2',
    name: 'ACLS — Advanced Cardiovascular Life Support',
    description: 'Advanced emergency care for cardiac arrest, symptomatic arrhythmias, and stroke.',
    progress: 0,
    preTestId: 'acls-pretest',
    postTestId: 'acls-posttest',
    modules: [
      {
        id: 'acls-m1',
        title: 'Cardiac Arrest Rhythm Recognition',
        type: 'reading',
        duration: '25 min',
        completed: false,
        locked: true,
        learningObjectives: 'Identify shockable (VF, pVT) and non-shockable (Asystole, PEA) cardiac arrest rhythms on an ECG monitor.',
        studyContent: 'ACLS rhythm assessment is the first step in advanced cardiac care.\n\nRhythm Categories:\n1. Ventricular Fibrillation (VF): Chaotic, disorganized electrical activity with no recognizable complexes. The heart quivers and cannot pump blood. Shockable rhythm.\n2. Pulseless Ventricular Tachycardia (pVT): Wide, regular, rapid QRS complexes. The ventricles contract too fast to allow filling, leading to absence of pulse. Shockable rhythm.\n3. Asystole: Complete absence of electrical activity (flatline). Non-shockable rhythm.\n4. Pulseless Electrical Activity (PEA): Any organized electrical rhythm on the monitor (except VT) in a patient who has no palpable pulse. Non-shockable rhythm.',
        clinicalScenario: 'A patient collapses in the CCU. You attach the monitor leads and observe a chaotic, wavy baseline with no QRS complexes. The patient is unresponsive and has no pulse. You diagnose Ventricular Fibrillation and immediately prepare to defibrillate.',
        algorithm: 'ECG Monitor Attached -> Check Rhythm -> (VF/pVT -> Shockable -> Deliver Shock) | (Asystole/PEA -> Non-shockable -> Resume CPR + Epinephrine).',
        commonMistakes: '1. Shocking Asystole or PEA (does not restore rhythm and damages the heart).\n2. Confusing fine Ventricular Fibrillation with Asystole, leading to missed shock opportunities.',
        safetyTips: '1. Always confirm a flatline rhythm in two perpendicular leads (leads II and III) to rule out lead disconnection mimicking Asystole.',
        keyPoints: [
          'Shockable rhythms: VF and pulseless VT.',
          'Non-shockable rhythms: Asystole and PEA.',
          'Defibrillation is indicated only for shockable rhythms.'
        ],
        summary: 'Cardiac arrest rhythms are classified as shockable (VF, pulseless VT) or non-shockable (Asystole, PEA). Defibrillate shockable rhythms immediately, and provide high-quality CPR and early Epinephrine for non-shockable rhythms.'
      },
      {
        id: 'acls-m2',
        title: 'High-Quality CPR and Defibrillation',
        type: 'reading',
        duration: '25 min',
        completed: false,
        locked: true,
        learningObjectives: 'Deliver high-quality chest compressions, integrate manual defibrillation, and monitor CPR quality with capnography.',
        studyContent: 'Manual Defibrillation:\n- Use biphasic defibrillators (standard energy: 120J to 200J) or monophasic defibrillators (360J).\n- Charge the defibrillator while compressions are ongoing to minimize pauses.\n\nMonitoring CPR Quality:\n- Quantitative Waveform Capnography (ETCO2): Measures exhaled carbon dioxide. If ETCO2 is < 10 mmHg, chest compressions are inadequate. Improve rate/depth. A sudden rise in ETCO2 to 35-40 mmHg indicates Return of Spontaneous Circulation (ROSC).\n- Arterial Relaxation Pressure: If diastolic BP is < 20 mmHg, improve compressions.',
        clinicalScenario: 'During resuscitation, the capnography monitor shows an ETCO2 of 8 mmHg. The Team Leader directs the compressor to push harder and faster. The ETCO2 rises to 14 mmHg. At the next rhythm check, the ETCO2 suddenly jumps to 38 mmHg, signaling ROSC.',
        algorithm: 'Rhythm is VF/pVT -> Charge Defibrillator -> Continue Compressions while charging -> Clear patient -> Deliver Shock -> Resume CPR instantly.',
        commonMistakes: '1. Stopping chest compressions while the defibrillator is charging.\n2. Allowing long pauses (>10 seconds) during rhythm checks.',
        safetyTips: '1. Remove high-flow oxygen sources from the chest area during shock delivery to prevent fire hazards.',
        keyPoints: [
          'Defibrillator energy: Biphasic 120-200J, Monophasic 360J.',
          'ETCO2 < 10 mmHg indicates poor chest compressions; target > 10 mmHg.',
          'Sudden jump in ETCO2 indicates ROSC.'
        ],
        summary: 'Deliver immediate shocks for VF/pVT. Continue compressions while the defibrillator charges, and monitor compression effectiveness using waveform capnography.'
      },
      {
        id: 'acls-m3',
        title: 'Bradycardia and Tachycardia Management',
        type: 'reading',
        duration: '30 min',
        completed: false,
        locked: true,
        learningObjectives: 'Manage bradycardia and tachycardia in stable and unstable patients, administer atropine/adenosine, and initiate pacing/cardioversion.',
        studyContent: 'Arrhythmia Management:\n- Check for signs of instability: Hypotension, altered mental status, chest pain, acute heart failure, or signs of shock.\n\nBradycardia (HR < 50 bpm):\n- Unstable: Administer Atropine 1 mg IV (repeat every 3-5 min, max 3 mg). If ineffective, initiate transcutaneous pacing (TCP) or start Dopamine (5-20 mcg/kg/min) or Epinephrine (2-10 mcg/min) infusion.\n\nTachycardia (HR > 150 bpm):\n- Unstable: Perform immediate synchronized cardioversion (syncs shock to R-wave to prevent VF).\n- Stable (Narrow QRS): Vagal maneuvers, then Adenosine (6 mg rapid IV push; if no response, give 12 mg).\n- Stable (Wide QRS): Consider antiarrhythmic infusion (Amiodarone 150 mg over 10 min).',
        clinicalScenario: 'A patient presents to the ER with a heart rate of 38 bpm, BP 82/44 mmHg, and cold diaphoresis (unstable bradycardia). You establish IV access, administer Atropine 1 mg IV, and prepare the transcutaneous pacing pads. The heart rate increases to 65 bpm after atropine.',
        algorithm: 'Bradycardia -> Unstable? -> Yes -> Atropine 1mg -> Ineffective? -> Pace or Infuse. Tachycardia -> Unstable? -> Yes -> Synchronized Cardioversion. Stable Tachycardia -> Wide QRS? -> Yes -> Amiodarone 150mg | No -> Vagal -> Adenosine 6mg/12mg.',
        commonMistakes: '1. Performing unsynchronized defibrillation on an unstable tachycardia patient, which can trigger Ventricular Fibrillation.\n2. Administering Atropine to a patient with a third-degree AV block with wide QRS (can worsen bradycardia; go straight to pacing).',
        safetyTips: '1. Always explain pacing or cardioversion to conscious patients and administer sedative medications if stable.',
        keyPoints: [
          'Unstable arrhythmias require immediate electrical interventions (pacing/cardioversion).',
          'Atropine dose is 1 mg IV, max 3 mg.',
          'Adenosine is given as a rapid 6 mg IV push, followed by a saline flush, then 12 mg if needed.'
        ],
        summary: 'Assess stable vs. unstable arrhythmias. Unstable patients need immediate pacing (bradycardia) or synchronized cardioversion (tachycardia). Stable narrow-complex tachycardias are managed with vagal maneuvers and Adenosine.'
      },
      {
        id: 'acls-m4',
        title: 'ACS and Stroke Overview',
        type: 'reading',
        duration: '25 min',
        completed: false,
        locked: true,
        learningObjectives: 'Assess Acute Coronary Syndromes (ACS) and stroke, interpret 12-lead ECG, identify STEMI, and manage acute ischemic stroke timing.',
        studyContent: 'Acute Coronary Syndrome (ACS):\n- Signs: Chest discomfort radiating to the arm/jaw, dyspnea, diaphoresis.\n- Diagnostics: 12-lead ECG (STEMI vs. NSTEMI/UA) and cardiac biomarkers.\n- Management: Aspirin 162-325 mg (chewable), Oxygen (if SpO2 < 90%), Nitroglycerin (sublingual), Morphine (if chest pain refractory to nitro). For STEMI: immediate reperfusion (PCI within 90 minutes of first contact).\n\nAcute Stroke:\n- Signs: Facial droop, arm drift, slurred speech (Cincinnati Prehospital Stroke Scale).\n- Diagnostics: Immediate non-contrast head CT scan to rule out hemorrhage.\n- Management: Fibrinolytic therapy (tPA) for ischemic stroke within 3 to 4.5 hours of symptom onset.',
        clinicalScenario: 'A 58-year-old male reports severe retrosternal chest pain. The 12-lead ECG shows ST-segment elevation in leads II, III, and aVF. You give chewable Aspirin, administer Nitroglycerin, and activate the cardiac catheterization lab for immediate PCI.',
        algorithm: 'Chest Pain -> ECG within 10 min -> STEMI? -> Yes -> Reperfusion (PCI <90 min). Neurological Deficit -> Stroke Scale -> Head CT <20 min -> Hemorrhage? -> No -> Ischemic Stroke -> Fibrinolytics if within window.',
        commonMistakes: '1. Giving Nitroglycerin to a patient with suspected right-ventricular infarction or hypotension.\n2. Administering Aspirin or Heparin to a stroke patient before obtaining a head CT to rule out hemorrhagic stroke.',
        safetyTips: '1. Re-evaluate blood pressure before every dose of Nitroglycerin.\n2. Verify the last known normal time for all stroke patients to assess fibrinolytic eligibility.',
        keyPoints: [
          'Obtain and interpret a 12-lead ECG within 10 minutes of arrival for chest pain.',
          'PCI balloon window is 90 minutes from medical contact.',
          'Obtain non-contrast head CT within 20 minutes of arrival for suspected stroke.'
        ],
        summary: 'ACS requires rapid 12-lead ECG diagnosis and STEMI activation for PCI. Acute stroke requires rapid neurological assessment and head CT to determine eligibility for fibrinolytic therapy.'
      },
      {
        id: 'acls-m5',
        title: 'Airway and Medications',
        type: 'reading',
        duration: '25 min',
        completed: false,
        locked: true,
        learningObjectives: 'Manage the airway using basic/advanced devices, confirm placement, and administer primary ACLS resuscitation drugs.',
        studyContent: 'Airway Management:\n- Advanced Airways: Laryngeal Mask Airway (LMA) or Endotracheal Tube (ETT). Use waveform capnography to verify placement.\n- Ventilation Rate with Advanced Airway: 1 breath every 6 seconds (10 breaths per minute) with continuous, uninterrupted chest compressions.\n\nACLS Medications:\n- Epinephrine: 1 mg IV/IO every 3 to 5 minutes. Indicated for all cardiac arrest rhythms.\n- Amiodarone: Indicated for VF/pulseless VT. First dose: 300 mg IV/IO bolus. Second dose: 150 mg IV/IO.\n- Lidocaine: Alternative to Amiodarone. First dose: 1 to 1.5 mg/kg. Second dose: 0.5 to 0.75 mg/kg.',
        clinicalScenario: 'A patient is in persistent VF after three shocks. The doctor places an endotracheal tube. You connect the capnograph and confirm a square wave. You administer Amiodarone 300 mg IV push and continue compressions without pauses, delivering 1 breath every 6 seconds.',
        algorithm: 'Establish CPR -> Insert Advanced Airway -> Confirm with ETCO2 -> Vent 1 breath/6s. Shockable Arrest -> Give Epinephrine 1mg after 2nd shock -> Give Amiodarone 300mg after 3rd shock.',
        commonMistakes: '1. Interrupting chest compressions for more than 10 seconds to attempt endotracheal intubation.\n2. Giving Amiodarone in PEA or Asystole (Amiodarone is for ventricular arrhythmias only).',
        safetyTips: '1. Always flush IV medications with 20 mL of normal saline and elevate the extremity to ensure rapid delivery.',
        keyPoints: [
          'Ventilation rate with an advanced airway in place is 1 breath every 6 seconds.',
          'Epinephrine is given at 1 mg IV/IO every 3-5 minutes.',
          'Amiodarone dose is 300 mg for the first dose, 150 mg for the second dose.'
        ],
        summary: 'Confirm advanced airway placement using waveform capnography. Provide continuous chest compressions and 1 breath every 6 seconds. Administer Epinephrine and Amiodarone/Lidocaine according to cardiac arrest algorithms.'
      },
      {
        id: 'acls-m6',
        title: 'Team Dynamics and Post-Arrest Care',
        type: 'reading',
        duration: '25 min',
        completed: false,
        locked: true,
        learningObjectives: 'Describe roles in high-performance team dynamics, execute post-cardiac arrest care, and manage Targeted Temperature Management (TTM).',
        studyContent: 'Team Dynamics:\n- Closed-loop communication: Confirm orders verbally.\n- Clear roles: Team Leader, Compressor, Airway, Monitor/Defib, Medications, Recorder.\n\nPost-Cardiac Arrest Care:\n1. Respiratory Optimization: Maintain SpO2 92-98% and PaCO2 35-45 mmHg. Do not hyperventilate.\n2. Hemodynamic Stabilization: Target Mean Arterial Pressure (MAP) >= 65 mmHg and systolic BP >= 90 mmHg. Administer IV fluids and infusions (Norepinephrine, Epinephrine, or Dopamine) if hypotensive.\n3. Targeted Temperature Management (TTM): If patient is comatose (unresponsive) after ROSC, cool to 32°C to 36°C for at least 24 hours to protect brain tissue.',
        clinicalScenario: 'A patient achieves ROSC but is comatose. You establish a Norepinephrine drip to keep the MAP at 70 mmHg and initiate TTM using a cooling blanket set to 33°C. You monitor for shivering and check blood gases regularly.',
        algorithm: 'ROSC Achieved -> Assess airway -> Target SpO2 92-98% -> Assess BP -> Maintain MAP >= 65 mmHg -> Obtain 12-lead ECG -> Comatose? -> Yes -> Initiate TTM (32°C-36°C for 24h).',
        commonMistakes: '1. Hyperventilating the post-ROSC patient, which causes cerebral vasoconstriction and worsens brain injury.\n2. Delaying therapeutic cooling in comatose patients.',
        safetyTips: '1. Avoid hypotension post-ROSC; a single episode of low blood pressure can compromise neurological recovery.',
        keyPoints: [
          'High-performance teams rely on clear roles and closed-loop communication.',
          'Target post-ROSC MAP is >= 65 mmHg.',
          'TTM (32°C-36°C) is indicated for comatose patients post-ROSC.'
        ],
        summary: 'Resuscitation outcomes improve with team dynamics. Post-ROSC care focuses on avoiding hyperoxygenation, maintaining BP (MAP >= 65 mmHg), obtaining a 12-lead ECG, and initiating Targeted Temperature Management (TTM) for comatose patients.'
      }
    ]
  },
  // PALS Course
  {
    id: 'c3',
    programId: 'p3',
    name: 'PALS — Pediatric Advanced Life Support',
    description: 'Master pediatric assessment, respiratory distress/failure management, pediatric shock resuscitation, and PALS algorithms.',
    progress: 0,
    preTestId: 'pals-pretest',
    postTestId: 'pals-posttest',
    modules: [
      {
        id: 'pals-m1',
        title: 'Doorway Look and PAT',
        type: 'reading',
        duration: '20 min',
        completed: false,
        locked: true,
        learningObjectives: 'Perform rapid, non-contact doorway assessment of a sick child using the Pediatric Assessment Triangle (PAT).',
        studyContent: 'The Pediatric Assessment Triangle (PAT) is a rapid visual and auditory assessment tool used within the first 30 seconds of encountering a pediatric patient, requiring no physical contact.\n\nPAT Components:\n1. Appearance: Reflects central nervous system perfusion and oxygenation. Evaluate using TICLS:\n   - Tone (muscle tone/floppiness)\n   - Interactiveness (alertness/response)\n   - Consolability (comforted by caregiver)\n   - Look/Gaze (focus on faces vs. blank stare)\n   - Speech/Cry (strong cry vs. weak/high-pitched)\n2. Work of Breathing: Reflects airway patency and ventilation. Look and listen for:\n   - Retractions (intercostal/substernal)\n   - Nasal flaring\n   - Stridor, grunting, or wheezing\n   - Head bobbing\n3. Circulation to Skin: Reflects cardiac output and perfusion to tissues. Assess for:\n   - Pallor (pale skin)\n   - Mottling (patchy discoloration)\n   - Cyanosis (blue color in skin or mucous membranes)',
        clinicalScenario: 'A mother carries her 18-month-old child into the clinic. From the doorway, you perform the PAT: the child is floppy and unresponsive (abnormal Appearance), shows severe intercostal retractions and head bobbing (abnormal Breathing), and appears pale (abnormal Circulation). You recognize this as respiratory failure and shock, and immediately direct the team to begin resuscitation.',
        algorithm: 'ENCOUNTER CHILD -> Doorway Look (<30s) -> Assess Appearance (TICLS) -> Assess Work of Breathing -> Assess Circulation to Skin -> Determine Severity -> If unstable, activate emergency response.',
        commonMistakes: '1. Entering the room and immediately touching the child with a cold stethoscope, which frightens them and alters their breathing and heart rate before you can get a baseline.\n2. Ignoring quiet grunting in an infant, which is a sign of severe respiratory distress.',
        safetyTips: '1. Always perform the PAT from a distance where the child is calm and not crying due to your presence.',
        keyPoints: [
          'The PAT consists of Appearance, Work of Breathing, and Circulation to Skin.',
          'Evaluate appearance using the TICLS mnemonic.',
          'PAT requires zero physical contact and is completed in under 30 seconds.'
        ],
        summary: 'The PAT allows rapid triage of a sick child before touch. Check appearance (TICLS), work of breathing, and circulation to skin to classify the child\'s physiological status and determine the urgency of care.'
      },
      {
        id: 'pals-m2',
        title: 'ABCDE Assessment',
        type: 'reading',
        duration: '20 min',
        completed: false,
        locked: true,
        learningObjectives: 'Conduct a systematic primary ABCDE assessment in children, evaluating airway, breathing, circulation, disability, and exposure.',
        studyContent: 'The primary assessment is a hands-on evaluation to identify respiratory, cardiovascular, or neurological dysfunction.\n\nABCDE Components:\n- Airway: Assess patency. Is the airway clear, maintainable (open with positioning), or unmaintainable (requires advanced airway)?\n- Breathing: Assess respiratory rate, chest expansion, air entry (breath sounds), pulse oximetry (SpO2), and work of breathing.\n- Circulation: Evaluate heart rate, peripheral and central pulses (brachial in infants, carotid/femoral in children), capillary refill time (normal is <= 2 seconds), skin temperature, and blood pressure.\n- Disability: Quick neurological check. Assess AVPU (Alert, Voice, Pain, Unresponsive), pupillary response, and blood glucose level.\n- Exposure: Undress the child to inspect for trauma, rashes, or abuse while preventing hypothermia (use warm blankets).',
        clinicalScenario: 'You are assessing a 4-year-old child with suspected sepsis. Airway is maintainable. Respiratory rate is 45/min with mild retractions. Peripheral pulses are weak and rapid (HR 175), skin is cool, and capillary refill is 4 seconds. BP is normal at 90/60 mmHg. You classify this as compensated septic shock and establish vascular access.',
        algorithm: 'Airway Patency -> Breathing Work/Rate -> Circulation Pulse/Refill/BP -> Disability AVPU/Sugar -> Exposure Exam & Temperature Control -> Intervene & Reassess.',
        commonMistakes: '1. Assuming a child is stable because their blood pressure is normal (compensated shock).\n2. Failing to check blood sugar in an altered or floppy child (hypoglycemia is a major pediatric emergency).',
        safetyTips: '1. Keep pediatric patients warm; hypothermia increases oxygen demand and worsens metabolic acidosis.',
        keyPoints: [
          'Evaluate each component of ABCDE systematically.',
          'Hypotension is a late and pre-arrest sign of shock in children.',
          'Always check blood glucose in critically ill children.'
        ],
        summary: 'Assess, identify, and intervene systematically using ABCDE. Watch capillary refill and pulse quality, check AVPU and blood glucose, and protect the patient from hypothermia.'
      },
      {
        id: 'pals-m3',
        title: 'Breathing Distress vs Failure',
        type: 'reading',
        duration: '20 min',
        completed: false,
        locked: true,
        learningObjectives: 'Differentiate between pediatric respiratory distress and respiratory failure, and apply appropriate oxygen therapy and bag-mask ventilation.',
        studyContent: 'Classifying Respiratory Disorders:\n1. Respiratory Distress: Increased work of breathing (retractions, nasal flaring, tachypnea) with preserved gas exchange (normal mental status, normal skin color, SpO2 normal on room air).\n2. Respiratory Failure: Inadequate oxygenation or ventilation. Signs include agonal gasping, slow/irregular breathing, cyanosis, lethargy, or SpO2 < 90% despite high-flow oxygen.\n\nManagement:\n- Distress: Administer supplemental oxygen (nasal cannula or non-rebreather mask).\n- Failure: Open airway and initiate Positive Pressure Ventilation (PPV) using a bag-mask device.\n- Ventilation Rate: 1 breath every 2 to 3 seconds (20 to 30 breaths per minute) for pediatric patients. Deliver each breath over 1 second, checking for chest rise.',
        clinicalScenario: 'An infant with severe bronchiolitis has a respiratory rate of 70/min, nasal flaring, and is crying (respiratory distress). You place them on oxygen. Ten minutes later, the infant becomes floppy, their respiratory rate drops to 15/min, and their lips turn blue (respiratory failure). You immediately open their airway and start bag-mask ventilation at a rate of 25 breaths/min.',
        algorithm: 'Evaluate Breathing -> Work of breathing high + normal mental state -> Respiratory Distress -> Give Oxygen. Altered mental state / cyanosis / gasping -> Respiratory Failure -> Start Bag-Mask Ventilation (20-30/min).',
        commonMistakes: '1. Failing to start bag-mask ventilation when a respiratory distress patient becomes quiet and breathing slows down (hypoxia-induced bradycardia).\n2. Hyperextending the neck of an infant during ventilation, which collapses their soft airway.',
        safetyTips: '1. Use a sniffing position (extend neck slightly, place a towel under the shoulders) to keep the airway open in infants.',
        keyPoints: [
          'Respiratory distress is compensated; respiratory failure is decompensated.',
          'Lethargy, cyanosis, and slow breathing indicate respiratory failure.',
          'Deliver bag-mask breaths at 1 breath every 2-3 seconds (20-30/min) for children.'
        ],
        summary: 'Respiratory distress is marked by effort, while respiratory failure is marked by failure to oxygenate (cyanosis, lethargy). Assist ventilation immediately using a bag-mask at a rate of 20-30 breaths/min.'
      },
      {
        id: 'pals-m4',
        title: 'Shock Recognition and Management',
        type: 'reading',
        duration: '25 min',
        completed: false,
        locked: true,
        learningObjectives: 'Recognize types of shock (hypovolemic, distributive, cardiogenic, obstructive) and perform fluid resuscitation and vascular access.',
        studyContent: 'Shock is a state of inadequate tissue perfusion.\n\nShock Types:\n1. Hypovolemic: Dehydration, hemorrhage (most common in children).\n2. Distributive: Septic, anaphylactic (warm/flushed or cold/pale skin, low systemic resistance).\n3. Cardiogenic: Congenital heart disease, myocarditis (signs of heart failure like hepatomegaly).\n4. Obstructive: Tension pneumothorax, cardiac tamponade.\n\nManagement:\n- Fluid Resuscitation: Administer 20 mL/kg bolus of isotonic crystalloid (normal saline or lactated Ringer\'s) over 5 to 20 minutes.\n- Reassess: Check liver size, breath sounds, and pulses after each bolus. If signs of fluid overload (hepatomegaly, rales) develop, stop fluids.\n- Vascular Access: Attempt IV access. If unable to place IV within 90 seconds, establish intraosseous (IO) access.',
        clinicalScenario: 'A 10 kg toddler with severe gastroenteritis is lethargic with a heart rate of 185 and capillary refill of 5 seconds. You cannot find an IV line. You place an IO needle in the proximal tibia and administer a 200 mL (20 mL/kg) bolus of normal saline over 10 minutes. The capillary refill improves to 2.5 seconds.',
        algorithm: 'Identify Shock -> Establish IV/IO access (<90s) -> Administer 20 mL/kg normal saline -> Reassess perfusion and liver size -> Repeat fluid bolus if necessary (up to 3 times for septic/hypovolemic).',
        commonMistakes: '1. Delaying fluid resuscitation to look for an IV when an IO needle could be placed immediately.\n2. Giving large, fast fluid volumes (20 mL/kg) in cardiogenic shock (use 5-10 mL/kg and monitor closely).',
        safetyTips: '1. Always check for liver enlargement (hepatomegaly) and lung rales to detect fluid overload during resuscitation.',
        keyPoints: [
          'Hypovolemic and distributive shock are treated with 20 mL/kg fluid boluses.',
          'Establish IO access if IV access is not secured within 90 seconds.',
          'Reassess the child after every fluid bolus.'
        ],
        summary: 'Identify the type of shock. Resuscitate with 20 mL/kg fluid boluses of normal saline via IV or IO access. Monitor liver size and breath sounds to avoid fluid overload.'
      },
      {
        id: 'pals-m5',
        title: 'High-Quality Pediatric CPR',
        type: 'reading',
        duration: '20 min',
        completed: false,
        locked: true,
        learningObjectives: 'Perform high-quality pediatric CPR adapting techniques for infants and children, using correct depths, rates, and compression-to-ventilation ratios.',
        studyContent: 'Pediatric CPR Adaptations:\n- Rates: 100 to 120 compressions per minute.\n- Depths:\n  - Children (1 year to puberty): About 2 inches (5 cm).\n  - Infants (< 1 year): About 1.5 inches (4 cm).\n  - Rule of thumb: Press down 1/3 of the anterior-posterior diameter of the chest.\n- Hand Placement:\n  - Children: 1 or 2 hands on the lower half of the sternum.\n  - Infants (1 Rescuer): 2 fingers on the sternum, just below the intermammary line.\n  - Infants (2 Rescuers): Two thumb-encircling hands technique (preferred, as it generates higher coronary perfusion pressure).\n- Compression-to-Ventilation Ratio:\n  - 1 Rescuer: 30:2 ratio.\n  - 2 Rescuers: 15:2 ratio (reduces ventilation delay).',
        clinicalScenario: 'You and a colleague respond to an infant in cardiac arrest. Your colleague secures the airway with a bag-mask, while you perform chest compressions using the two thumb-encircling hands technique. You compress the chest 1.5 inches deep at 110/min, counting out loud. You deliver 15 compressions, then pause for your colleague to give 2 breaths.',
        algorithm: 'Unresponsive Child -> No pulse/breathing -> 1 Rescuer -> 30:2 ratio. 2 Rescuers -> 15:2 ratio. Compressions: 1/3 AP depth (1.5 in infants, 2 in children) at 100-120/min.',
        commonMistakes: '1. Compressing the chest of a child too deeply (e.g. adult depth) or too shallowly.\n2. Using the 30:2 ratio when two rescuers are present, which decreases the frequency of ventilations.',
        safetyTips: '1. In infants, do not press on the bottom of the sternum (xiphoid process) to avoid liver laceration.',
        keyPoints: [
          'Depth is 1/3 AP diameter of the chest (1.5 inches for infants, 2 inches for children).',
          'Use the 15:2 compression-to-ventilation ratio for two-rescuer pediatric CPR.',
          'Two thumb-encircling hands is the preferred technique for two-rescuer infant CPR.'
        ],
        summary: 'Pediatric CPR requires matching the technique to the child\'s size. Use a 15:2 ratio for two-rescuer CPR, and compress 1/3 of the chest depth (1.5 inches for infants, 2 inches for children) at a rate of 100-120 bpm.'
      },
      {
        id: 'pals-m6',
        title: 'PALS Algorithm and Post-ROSC Care',
        type: 'reading',
        duration: '20 min',
        completed: false,
        locked: true,
        learningObjectives: 'Apply PALS cardiac arrest algorithms for shockable/non-shockable rhythms, manage pediatric bradycardia with poor perfusion, and initiate post-ROSC care.',
        studyContent: 'PALS Arrest Algorithm:\n- Shockable (VF/pVT): Deliver shock (2 J/kg, then 4 J/kg, max 10 J/kg). Give Epinephrine 0.01 mg/kg IV/IO (every 3-5 min) and Amiodarone 5 mg/kg IV/IO (repeat up to 3 times) for refractory VF.\n- Non-Shockable (Asystole/PEA): Give Epinephrine 0.01 mg/kg immediately.\n\nPediatric Bradycardia with Poor Perfusion (HR < 60 bpm):\n- Start CPR if the child is unresponsive, has poor perfusion, and heart rate is < 60 bpm despite oxygenation and ventilation.\n- Give Epinephrine 0.01 mg/kg or Atropine 0.02 mg/kg (for increased vagal tone).\n\nPost-ROSC Care:\n- Target SpO2 94-99%. Avoid hyperoxygenation.\n- Maintain Systolic BP >= 5th percentile for age. Give fluid boluses or epinephrine/norepinephrine infusions to maintain perfusion.',
        clinicalScenario: 'A 6-year-old child presents with bradycardia (HR 45/min) and lethargy. You provide bag-mask ventilation, but after 30 seconds, the heart rate remains 45/min and the child is pale. You start chest compressions and administer Epinephrine 0.01 mg/kg IV. The heart rate rises to 110 bpm (ROSC). You monitor blood pressure and maintain SpO2 at 96%.',
        algorithm: 'HR < 60 with poor perfusion -> Vent -> Still < 60 -> CPR -> Epinephrine 0.01 mg/kg. Cardiac Arrest -> VF/pVT -> Shock -> CPR -> Shock -> CPR + Epi -> Amiodarone. Asystole/PEA -> CPR + Epi ASAP.',
        commonMistakes: '1. Waiting for the heart rate to drop to zero before starting chest compressions in a bradycardic child (start CPR if HR < 60 with poor perfusion).\n2. Using adult medication doses instead of calculating weight-based (mg/kg) pediatric doses.',
        safetyTips: '1. Always check the pediatric emergency tape (Broselow tape) or calculator for correct medication volumes.',
        keyPoints: [
          'Start CPR in children if HR is < 60 bpm with poor perfusion despite ventilation.',
          'Defibrillation dose starts at 2 J/kg, then 4 J/kg.',
          'Weight-based dosing (mg/kg) is mandatory in PALS.'
        ],
        summary: 'PALS cardiac arrest and bradycardia algorithms focus on ventilation and weight-based epinephrine. Start CPR if HR is < 60 bpm with poor perfusion, and optimize hemodynamics post-ROSC.'
      }
    ]
  },
  // NALS Course
  {
    id: 'c4',
    programId: 'p4',
    name: 'NALS — Neonatal Resuscitation',
    description: 'Golden Minute, Positive Pressure Ventilation, MR SOPA, neonatal chest compressions, medications, and preterm resuscitation.',
    progress: 0,
    preTestId: 'nals-pretest',
    postTestId: 'nals-posttest',
    modules: [
      {
        id: 'nals-m1',
        title: 'Before the Baby Arrives',
        type: 'reading',
        duration: '20 min',
        completed: false,
        locked: true,
        learningObjectives: 'Perform antenatal risk assessment, prepare resuscitation equipment, assign team roles, and conduct initial newborn evaluation.',
        studyContent: 'Preparation for neonatal resuscitation is key to managing transition issues at birth.\n\nAntenatal Risk Assessment (4 Questions):\n1. What is the expected gestational age?\n2. Is the amniotic fluid clear?\n3. How many babies are expected?\n4. Are there any additional risk factors?\n\nEquipment Check (The Checklist):\n- Warm: Pre-warm the radiant warmer, towels, hat.\n- Clear: Suction bulb, suction catheter (set suction to 80-100 mmHg).\n- Breathe: Stethoscope, bag-mask or T-piece resuscitator, oxygen blender.\n- Intubate: Laryngoscope (blades 00, 0, 1), endotracheal tubes (2.5, 3.0, 3.5 mm).\n- Medicate: Epinephrine, normal saline, catheters.\n\nInitial Evaluation at Birth:\n- Ask: Term? Good tone? Breathing or crying?\n- If YES: Baby remains with mother for routine care (dry, warm, skin-to-skin).\n- If NO: Transfer to radiant warmer for initial steps.',
        clinicalScenario: 'A mother is in labor at 36 weeks with meconium-stained fluid. The resuscitation team performs the 4-question assessment, prepares a radiant warmer, verifies suction is set to 90 mmHg, and lays out a 3.0 mm endotracheal tube. At birth, the infant is limp and not breathing. You immediately transfer the infant to the warmer.',
        algorithm: 'Antenatal Assessment -> Check Equipment -> Baby Born -> Term? Tone? Crying? -> No -> Radiant Warmer -> Warm, dry, stimulate -> Position airway -> Clear secretions if necessary.',
        commonMistakes: '1. Failing to test the ventilation bag or suction equipment before delivery.\n2. Suctioning the airway routinely in a vigorous, healthy baby (causes bradycardia).',
        safetyTips: '1. Set the suction regulator to not exceed 100 mmHg to prevent airway trauma and bradycardia.',
        keyPoints: [
          'Ask the 4 assessment questions before every birth.',
          'Verify and pre-test all resuscitation equipment prior to delivery.',
          'Initial steps: Warm, dry, stimulate, position airway, and suction if obstructed.'
        ],
        summary: 'Prepare for neonatal resuscitation by asking the 4 antenatal questions, testing all equipment, and assessing the baby at birth (term, tone, breathing) to decide on intervention.'
      },
      {
        id: 'nals-m2',
        title: 'Golden Minute',
        type: 'reading',
        duration: '20 min',
        completed: false,
        locked: true,
        learningObjectives: 'Implement resuscitation steps within the first 60 seconds ("Golden Minute") of life, evaluating heart rate and breathing.',
        studyContent: 'The "Golden Minute" refers to the first 60 seconds after birth. During this time, you must complete the initial steps, re-evaluate the newborn, and start Positive Pressure Ventilation (PPV) if the baby remains apneic or has a low heart rate.\n\nGolden Minute Steps (0-60 seconds):\n1. Initial Steps (Warm, position airway, clear secretions if obstructed, dry, and stimulate). Complete within 30 seconds.\n2. Assessment: Evaluate heart rate (listen with stethoscope for 6 seconds, multiply by 10) and breathing (crying, apnea, or agonal gasps).\n3. Action Decision:\n   - Heart Rate < 100 bpm OR apneic/gasping -> Start Positive Pressure Ventilation (PPV) immediately.\n   - Heart Rate >= 100 bpm and breathing normally -> Routine monitoring, consider CPAP if labored breathing or cyanosis.',
        clinicalScenario: 'A newborn is placed under the radiant warmer. You dry the baby, stimulate by flicking the feet, and suction the mouth then the nose. At 45 seconds of life, the baby is gasping and you hear a heart rate of 80 bpm. You immediately apply the mask to begin PPV, meeting the Golden Minute window.',
        algorithm: 'BIRTH -> Radiant Warmer (0-30s) -> Warm, dry, stimulate -> Assess HR & Breathing (30-60s) -> If HR < 100 or apneic -> START PPV.',
        commonMistakes: '1. Wasting time drying a severely depressed baby repeatedly instead of initiating ventilation within 60 seconds.\n2. Measuring the heart rate by palpating the umbilical cord (unreliable; use a stethoscope).',
        safetyTips: '1. Do not stimulate the baby for more than 10-15 seconds before deciding to initiate ventilation.',
        keyPoints: [
          'The Golden Minute window is 60 seconds to evaluate and start ventilation if needed.',
          'Heart rate < 100 bpm or apnea is the primary indication for PPV.',
          'Measure heart rate by listening to the precordium with a stethoscope.'
        ],
        summary: 'The Golden Minute focuses on starting ventilation within 60 seconds of birth. Dry, stimulate, and check the heart rate. If the heart rate is < 100 bpm or the baby is not breathing, start PPV immediately.'
      },
      {
        id: 'nals-m3',
        title: 'Positive Pressure Ventilation (PPV)',
        type: 'reading',
        duration: '25 min',
        completed: false,
        locked: true,
        learningObjectives: 'Deliver effective positive pressure ventilation (PPV), titrate oxygen concentration, and monitor pre-ductal oxygen saturation.',
        studyContent: 'Positive Pressure Ventilation (PPV) is the single most important intervention in neonatal resuscitation.\n\nPPV Parameters:\n- Rate: 40 to 60 breaths per minute. Use the cadence: "Breathe, two, three; Breathe, two, three" (squeeze on "Breathe", release on "two, three").\n- Pressure: Initial inflation pressure of 20-25 cm H2O. If term baby, start with 21% oxygen (room air). If preterm (<35 weeks), start with 21-30% oxygen. Titrate based on saturation targets.\n- Pre-ductal SpO2 Monitoring: Attach a pulse oximeter sensor to the right hand or wrist (pre-ductal, as it reflects blood flowing to the brain before the ductus arteriosus).\n\nTarget Pre-ductal SpO2 Table:\n- 1 min: 60-65%\n- 2 min: 65-70%\n- 3 min: 70-75%\n- 4 min: 75-80%\n- 5 min: 80-85%\n- 10 min: 85-95%',
        clinicalScenario: 'You start PPV on an infant with a heart rate of 70 bpm. You attach the pulse oximeter to their right wrist. You count: "Breathe, two, three; Breathe, two, three" while squeezing the bag. At 3 minutes, the SpO2 is 72% (meeting target). The heart rate rises to 110 bpm.',
        algorithm: 'Indication for PPV -> Attach SpO2 to right hand -> Start PPV at 40-60 bpm -> Squeeze 20-25 cmH2O -> Monitor HR and pre-ductal SpO2 -> Adjust oxygen concentration.',
        commonMistakes: '1. Starting ventilation with 100% oxygen for term babies (causes oxidative damage; start with 21% and titrate).\n2. Placing the pulse oximeter on the left hand or foot, which reads post-ductal saturation (unreliable for cerebral perfusion).',
        safetyTips: '1. Ensure the ventilation mask does not cover the eyes, which can cause optic nerve damage.',
        keyPoints: [
          'PPV rate is 40-60 breaths per minute.',
          'Start PPV with 21% O2 in term infants, and 21-30% O2 in preterm infants.',
          'Always measure pre-ductal oxygen saturation on the right wrist.'
        ],
        summary: 'Provide PPV at 40-60 breaths per minute using 21% oxygen for term babies. Monitor pre-ductal SpO2 on the right wrist and titrate oxygen to meet target saturation tables.'
      },
      {
        id: 'nals-m4',
        title: 'MR SOPA',
        type: 'reading',
        duration: '25 min',
        completed: false,
        locked: true,
        learningObjectives: 'Identify ventilation issues and perform MR SOPA ventilation corrective steps systematically.',
        studyContent: 'If the baby\'s heart rate is not rising and you do not see chest rise during PPV, the ventilation is ineffective. Perform the MR SOPA corrective steps in order:\n\nM: Mask adjustment (re-seat mask for seal)\nR: Reposition airway (put head in sniffing position)\n-- Try PPV and check chest rise. If no rise, proceed:\nS: Suction mouth and nose (clear mucus/fluid, mouth first then nose)\nO: Open mouth (use finger to open jaw slightly)\n-- Try PPV and check chest rise. If no rise, proceed:\nP: Pressure increase (increase inflation pressure by 5 cm H2O, up to max 30-40 cm H2O)\n-- Try PPV and check chest rise. If no rise, proceed:\nA: Alternative airway (insert endotracheal tube or laryngeal mask).',
        clinicalScenario: 'You are delivering PPV, but the chest is not moving and the baby\'s heart rate is 50 bpm. You perform MR: adjust the mask and reposition the head. Still no chest rise. You perform SO: suction the mouth and nose, and open the mouth. You try PPV again and see chest rise. The heart rate rises to 120 bpm.',
        algorithm: 'No chest rise with PPV -> Mask Adjustment & Reposition Airway -> Try PPV -> No chest rise -> Suction & Open Mouth -> Try PPV -> No chest rise -> Pressure Increase -> Try PPV -> No chest rise -> Alternative Airway (ETT/LMA).',
        commonMistakes: '1. Proceeding to chest compressions when the heart rate is < 60 bpm without ensuring you have effective ventilation (chest rise) first.\n2. Suctioning the nose before the mouth (can cause aspiration if the baby gasps).',
        safetyTips: '1. Do not exceed 40 cm H2O pressure in term infants (30 cm H2O in preterm) to prevent pneumothorax.',
        keyPoints: [
          'MR SOPA steps are performed sequentially to establish effective ventilation.',
          'Chest rise is the primary indicator of successful PPV.',
          'Always establish effective ventilation before starting chest compressions.'
        ],
        summary: 'Use the MR SOPA sequence (Mask, Reposition, Suction, Open mouth, Pressure, Alternative airway) if PPV does not cause chest rise. Establish chest movement before performing compressions.'
      },
      {
        id: 'nals-m5',
        title: 'Chest Compressions and Medications',
        type: 'reading',
        duration: '25 min',
        completed: false,
        locked: true,
        learningObjectives: 'Perform coordinated neonatal chest compressions (3:1 ratio), establish umbilical venous access, and administer Epinephrine.',
        studyContent: 'Neonatal Chest Compressions:\n- Indication: Heart rate remains < 60 bpm despite at least 30 seconds of effective PPV (causing chest rise).\n- Technique: Two-thumb technique is preferred. Place thumbs side-by-side on the lower third of the sternum (just below nipple line), encircling the chest with your fingers.\n- Depth: Compress 1/3 of the AP diameter of the chest.\n- Coordinated Ratio: 3 compressions to 1 ventilation (90 compressions and 30 breaths per minute; 120 total events/minute). Say aloud: "One-and-two-and-three-and-breathe-and...". Use 100% oxygen when starting compressions.\n\nMedications:\n- Umbilical Venous Catheter (UVC): Preferred access for rapid fluid/drug administration.\n- Epinephrine: 0.1 to 0.3 mL/kg of a 1:10,000 solution IV/IO (equal to 0.01-0.03 mg/kg). Repeat every 3-5 minutes if HR remains < 60.\n- Volume Expander: Normal saline 10 mL/kg over 5-10 minutes if blood loss is suspected.',
        clinicalScenario: 'You have done 30 seconds of PPV with chest rise, but the heart rate remains 50 bpm. You intubate the baby, increase oxygen to 100%, and begin compressions coordinated 3:1 with the ventilator. A second colleague inserts a UVC and gives Epinephrine. After 60 seconds of compressions, the heart rate rises to 90 bpm. You stop compressions and continue PPV.',
        algorithm: 'HR < 60 after 30s of PPV -> Intubate -> Start 3:1 compressions/breaths with 100% O2 -> Reassess after 60s -> HR still < 60 -> Insert UVC -> Give Epinephrine 0.1-0.3 mL/kg IV -> Flush.',
        commonMistakes: '1. Compressing and ventilating simultaneously (neonatal CPR requires coordinated 3:1 alternation to prevent high intrathoracic pressure).\n2. Giving Epinephrine endotracheally as first line when a UVC or IO can be established (intravenous route is much more effective).',
        safetyTips: '1. Do not perform chest compressions and ventilation simultaneously; allow the breath to deliver on the "breathe" count.',
        keyPoints: [
          'Start compressions if HR is < 60 bpm despite 30 seconds of effective PPV.',
          'Use the two-thumb encircling technique and compress 1/3 AP depth.',
          'Maintain a 3:1 compression-to-ventilation ratio.',
          'Neonatal Epinephrine dose is 0.1-0.3 mL/kg IV/IO (1:10,000).'
        ],
        summary: 'Start compressions if the heart rate remains < 60 bpm despite effective PPV. Coordinate compressions and ventilation at a 3:1 ratio, use 100% oxygen, and administer Epinephrine via a UVC if needed.'
      },
      {
        id: 'nals-m6',
        title: 'Special Situations and Post-Resuscitation Care',
        type: 'reading',
        duration: '25 min',
        completed: false,
        locked: true,
        learningObjectives: 'Manage preterm infant resuscitation, identify congenital anomalies, and deliver post-resuscitation care in the NICU.',
        studyContent: 'Preterm Infants (<32 weeks):\n- Thermoregulation: Preterm babies have thin skin and lack fat. Immediately place the baby in a plastic wrap/bag (up to the neck, without drying) under the radiant warmer to prevent evaporative heat loss. Apply a hat and thermal mattress.\n- Ventilation: Use lower pressures to avoid pneumothorax. PEEP (Positive End-Expiratory Pressure) is critical to prevent alveolar collapse.\n\nPost-Resuscitation Care:\n- Transfer the baby to the NICU for monitoring.\n- Monitor blood glucose: Avoid hypoglycemia (target >45 mg/dL).\n- Therapeutic Hypothermia: If term infant shows signs of moderate-to-severe hypoxic-ischemic encephalopathy (HIE), initiate cooling to 33.5°C within 6 hours of birth for 72 hours.',
        clinicalScenario: 'A 28-week preterm baby is delivered. You immediately place the baby\'s body in a plastic bag, attach a pulse oximeter, and start PPV using a T-piece resuscitator with a PEEP of 5 cm H2O. You monitor their temperature and transport them in a warm incubator to the NICU.',
        algorithm: 'Preterm Delivery -> Do not dry -> Place in plastic wrap -> Warm room -> Start ventilation with PEEP -> Transport to NICU -> Monitor temperature & glucose.',
        commonMistakes: '1. Drying a very preterm infant with towels, which rubs off their delicate skin barrier and causes rapid cooling.\n2. Allowing the infant\'s temperature to drop during transfer to the NICU.',
        safetyTips: '1. Do not use high ventilation pressures in preterm lungs; their fragile alveoli are easily ruptured.',
        keyPoints: [
          'Preterm infants under 32 weeks must be wrapped in plastic wrap immediately without drying.',
          'Hypoglycemia is a common post-resuscitation complication; check blood sugar.',
          'Consider therapeutic cooling for encephalopathic term infants.'
        ],
        summary: 'Resuscitating preterm infants requires plastic wrapping to conserve heat, and low pressures with PEEP. Post-resuscitation care focuses on monitoring blood glucose and body temperature in the NICU.'
      }
    ]
  },
  // ATLS Course
  {
    id: 'c5',
    programId: 'p5',
    name: 'ATLS — Advanced Trauma Life Support',
    description: 'Master the evaluation, triage, and resuscitation of major trauma patients.',
    progress: 0,
    preTestId: 'atls-pretest',
    postTestId: 'atls-posttest',
    modules: [
      {
        id: 'atls-m1',
        title: 'Primary Survey',
        type: 'reading',
        duration: '25 min',
        completed: false,
        locked: true,
        learningObjectives: 'Conduct a systematic primary survey in trauma patients, prioritizing life-threatening injuries.',
        studyContent: 'The primary survey is a systematic, sequential assessment designed to identify and treat life-threatening injuries in trauma patients. Follow the ABCDE sequence, treating injuries as they are found:\n\nABCDE Survey:\n- A: Airway with restriction of cervical spine motion. Check for obstruction (blood, teeth, tongue). Protect the neck.\n- B: Breathing and ventilation. Inspect chest wall movement, listen to breath sounds, check for tension pneumothorax, open pneumothorax, or flail chest.\n- C: Circulation with hemorrhage control. Identify external bleeding (apply pressure/tourniquets) and internal bleeding sites (chest, abdomen, pelvis, long bones). Assess pulses, skin color, and blood pressure.\n- D: Disability. Assess neurological status using the Glasgow Coma Scale (GCS) and pupillary response.\n- E: Exposure and Environment. Fully undress the patient to inspect all injuries, then cover with warm blankets to prevent hypothermia.',
        clinicalScenario: 'A 25-year-old male is brought to the ER after a motor vehicle crash. He is tachycardic, tachypneic, and cold. You apply manual in-line cervical stabilization. During B, you note absent breath sounds on the right and tracheal deviation. You perform needle decompression immediately, restoring breath sounds, before moving to C.',
        algorithm: 'TRAUMA ARRIVAL -> Secure neck -> Check airway (A) -> Assess breathing (B) -> Identify bleeding (C) -> Check pupils & GCS (D) -> Undress & warm (E) -> Reassess.',
        commonMistakes: '1. Moving to the next step of the survey before resolving a life-threat in the current step (e.g. assessing circulation while the airway is completely obstructed).\n2. Palpating the cervical spine or moving the neck during airway assessment.',
        safetyTips: '1. Assume a cervical spine injury in all blunt trauma patients; restrict movement with manual in-line stabilization or a collar.',
        keyPoints: [
          'The primary survey follows the ABCDE sequence.',
          'Cervical spine protection is integrated into airway management.',
          'Identify and treat life-threats as they are encountered.'
        ],
        summary: 'The primary survey (ABCDE) is the core of ATLS. Secure the airway while protecting the cervical spine, evaluate breathing and chest trauma, control hemorrhages, perform a neurological exam, and prevent hypothermia.'
      },
      {
        id: 'atls-m2',
        title: 'Airway with Cervical Spine Protection',
        type: 'reading',
        duration: '25 min',
        completed: false,
        locked: true,
        learningObjectives: 'Establish a definitive airway while maintaining cervical spine protection, and recognize indications for intubation.',
        studyContent: 'Airway Assessment:\n- Check for patency: Look for retraction, listen for stridor, gurgling, or hoarseness.\n- Spinal restriction: Keep a collar on or hold the head neutral. Never hyperextend the neck.\n\nIndications for Definitive Airway (Intubation):\n1. Glasgow Coma Scale (GCS) score of 8 or less ("GCS of 8, associate with intubating").\n2. Severe maxillofacial fractures obstructing the airway.\n3. Impending airway compromise (e.g. inhalation burns with stridor).\n4. Severe respiratory distress or inability to oxygenate.\n\nAlternative Airways:\n- Laryngeal Mask Airway (LMA) or surgical Cricothyroidotomy (if intubation fails).',
        clinicalScenario: 'A patient falls from a height and presents with a GCS of 6 and blood in the oral cavity. You perform manual in-line stabilization while a colleague suctions the airway and performs rapid sequence intubation (RSI) using a 7.5 mm endotracheal tube.',
        algorithm: 'Assess Airway -> GCS <= 8 -> Maintain C-spine hold -> Prepare intubation -> Pre-oxygenate -> Perform RSI -> Confirm tube placement with ETCO2.',
        commonMistakes: '1. Hyperextending the neck to open the airway in a trauma patient (use the jaw-thrust maneuver instead).\n2. Wasting time trying to intubate repeatedly when a surgical airway or LMA is needed.',
        safetyTips: '1. Keep a surgical cricothyroidotomy kit open at the bedside during difficult intubations in trauma.',
        keyPoints: [
          'Definitive airway is required for patients with GCS <= 8.',
          'Perform a jaw thrust, not head tilt, to open the airway in trauma.',
          'Maintain manual in-line stabilization during intubation.'
        ],
        summary: 'Establish a definitive airway for patients with GCS <= 8 or airway compromise. Secure the airway while holding the cervical spine neutral using manual in-line stabilization.'
      },
      {
        id: 'atls-m3',
        title: 'Breathing and Chest Trauma',
        type: 'reading',
        duration: '25 min',
        completed: false,
        locked: true,
        learningObjectives: 'Diagnose and treat life-threatening chest injuries including tension pneumothorax, open pneumothorax, flail chest, and massive hemothorax.',
        studyContent: 'Life-Threatening Thoracic Injuries:\n1. Tension Pneumothorax:\n   - Signs: Respiratory distress, absent breath sounds on the affected side, hyperresonance, tracheal deviation away from the injury, hypotension.\n   - Treatment: Immediate needle decompression (5th intercostal space, anterior axillary line) followed by a chest tube.\n2. Open Pneumothorax (Sucking Chest Wound):\n   - Treatment: Sterile occlusive dressing taped on 3 sides (creates a flutter valve, allowing air out but not in).\n3. Flail Chest (Multiple rib fractures causing paradoxical chest movement):\n   - Treatment: Oxygen, pain control, consider intubation and ventilation if respiratory failure occurs.\n4. Massive Hemothorax (>1500 mL of blood initially or >200 mL/hr for 2-4 hours):\n   - Treatment: Chest tube insertion and urgent surgical thoracotomy.',
        clinicalScenario: 'A patient with a stab wound to the right chest presents with severe dyspnea, distended neck veins, and BP 80/40 mmHg. Breath sounds are absent on the right. You immediately insert a needle into the 5th intercostal space, anterior axillary line. You hear a rush of air, and the blood pressure rises to 110/70 mmHg.',
        algorithm: 'Chest Trauma -> Assess breathing -> Distended neck veins + absent breath sounds + shock -> Tension Pneumothorax -> Needle decompression -> Insert chest tube.',
        commonMistakes: '1. Delaying needle decompression in a tension pneumothorax to wait for a chest X-ray (tension pneumothorax is a clinical diagnosis).\n2. Taping an open chest wound dressing on all 4 sides (converts it into a tension pneumothorax).',
        safetyTips: '1. Constantly monitor the chest tube drainage. A rapid loss of blood indicates a massive hemothorax requiring OR transfer.',
        keyPoints: [
          'Tension pneumothorax is a clinical diagnosis; do not wait for an X-ray.',
          'Decompress tension pneumothorax in the 5th intercostal space, anterior axillary line.',
          'Dress open pneumothorax with a 3-sided tape technique.'
        ],
        summary: 'Chest trauma life-threats must be managed during the breathing phase of the primary survey. Decompress tension pneumothoraces, dress open wounds on 3 sides, and monitor chest tube output.'
      },
      {
        id: 'atls-m4',
        title: 'Circulation and Shock',
        type: 'reading',
        duration: '25 min',
        completed: false,
        locked: true,
        learningObjectives: 'Recognize stages of hemorrhagic shock, control bleeding, and deliver balanced blood product resuscitation.',
        studyContent: 'Hemorrhagic Shock Classification:\n- Class I: Blood loss <15% (normal vitals).\n- Class II: Blood loss 15-30% (tachycardia, normal BP).\n- Class III: Blood loss 30-40% (hypotension, marked tachycardia, confusion).\n- Class IV: Blood loss >40% (severe hypotension, narrow pulse pressure, lethargy).\n\nManagement:\n- Bleeding Control: Direct pressure, tourniquets, pelvic binder (for pelvic fractures).\n- Resuscitation: Establish two large-bore IVs (14 or 16 gauge). Give 1 liter of warm normal saline/LR. If patient is in Class III or IV shock, start blood products immediately.\n- Massive Transfusion Protocol (MTP): Transfuse in a 1:1:1 ratio (Packed Red Blood Cells, Fresh Frozen Plasma, and Platelets) to prevent coagulopathy.',
        clinicalScenario: 'A patient with a lacerated femoral artery presents with a BP of 76/40, HR 145, and cold extremities (Class IV shock). You apply a tourniquet, start warm fluids, and activate the massive transfusion protocol. You administer 2 units of uncrossmatched O-negative blood.',
        algorithm: 'Shock identified -> Give 1L warm crystalloid -> Hemodynamic response check -> (Responder -> Continue monitoring) | (Transient/Non-responder -> Start 1:1:1 blood transfusion).',
        commonMistakes: '1. Giving large volumes of cold crystalloid fluids (causes dilutional coagulopathy, hypothermia, and acidosis—the "triad of death").\n2. Delaying blood transfusion in patients with Class IV shock.',
        safetyTips: '1. Keep blood products and IV fluids warm to prevent cardiac arrhythmias caused by hypothermia.',
        keyPoints: [
          'Hypotension is a late sign of hemorrhagic shock (Class III or IV).',
          'Limit crystalloid fluids to 1L and use blood products early.',
          'Utilize a 1:1:1 blood transfusion ratio for massive hemorrhages.'
        ],
        summary: 'Identify the class of shock. Limit crystalloid fluids and transfuse blood products early using a 1:1:1 ratio (PRBC, FFP, platelets) to prevent coagulopathy and hypothermia.'
      },
      {
        id: 'atls-m5',
        title: 'Disability and Exposure',
        type: 'reading',
        duration: '25 min',
        completed: false,
        locked: true,
        learningObjectives: 'Perform a neurological exam using Glasgow Coma Scale (GCS), identify pupil changes, and manage exposure while preventing hypothermia.',
        studyContent: 'Disability (Neurological Evaluation):\n- Glasgow Coma Scale (GCS):\n  - Eye Opening (1-4)\n  - Verbal Response (1-5)\n  - Motor Response (1-6)\n  - Severe brain injury: GCS 3 to 8. Moderate: GCS 9 to 12. Mild: GCS 13 to 15.\n- Pupils: Check size, equality, and reaction to light. A unilaterally dilated, sluggish pupil indicates intracranial mass effect/herniation.\n\nExposure & Environment:\n- Undress the patient fully to examine all areas (especially back and perineum) for hidden injuries.\n- Cover immediately with warm blankets, use warm fluids, and maintain a warm room to prevent hypothermia.',
        clinicalScenario: 'A trauma patient with head trauma opens their eyes to pain (2), makes incomprehensible sounds (2), and localizes pain (5). GCS is 9. Their left pupil is dilated and reacts slowly. You elevate the head of the bed, maintain oxygenation, and arrange for an urgent head CT scan.',
        algorithm: 'Calculate GCS -> Check pupils -> Assess lateralizing signs -> Undress patient -> Inspect back -> Cover with warm blankets.',
        commonMistakes: '1. Failing to check the patient\'s back (e.g. missed penetrating wounds) because of failure to logroll.\n2. Allowing the patient to remain undressed on a cold metal trauma table, causing severe hypothermia.',
        safetyTips: '1. Logroll the patient using a team of four to maintain spinal stabilization while inspecting the back.',
        keyPoints: [
          'Evaluate GCS and check pupils during the Disability phase.',
          'GCS <= 8 indicates a severe traumatic brain injury.',
          'Fully undress the patient but cover them immediately to avoid hypothermia.'
        ],
        summary: 'Calculate the GCS and assess pupils to evaluate neurological function. Undress the patient fully to perform a complete head-to-toe examination, then cover with warm blankets to prevent hypothermia.'
      },
      {
        id: 'atls-m6',
        title: 'Trauma Scenarios',
        type: 'reading',
        duration: '20 min',
        completed: false,
        locked: true,
        learningObjectives: 'Integrate ATLS principles to manage multi-system trauma cases, establish priorities, and coordinate transfer to definitive care.',
        studyContent: 'Resuscitation in trauma requires prioritizing treatments based on what is most likely to kill the patient first. Follow the primary survey, secondary survey, and transfer protocols.\n\nPrioritization Rules:\n1. Treat airway issues before breathing issues, and breathing before circulation.\n2. Do not delay transfer to a trauma center to obtain secondary diagnostics (e.g. CT scans) if the patient is unstable.\n3. The secondary survey is a detailed head-to-toe evaluation, performed only AFTER the primary survey is complete, the patient is stabilized, and vitals are normal.',
        clinicalScenario: 'An unstable patient with pelvic pain and abdominal distension is brought in. The primary survey is complete. The FAST scan shows fluid in the abdomen. You apply a pelvic binder and contact the trauma surgeon. You bypass the CT scan and transfer the patient directly to the operating room for an emergency laparotomy.',
        algorithm: 'Primary Survey (ABCDE) -> Stabilize -> FAST scan -> If unstable with internal bleeding -> Transfer directly to OR -> If stable -> Perform Secondary Survey (detailed history/exam) -> CT scans.',
        commonMistakes: '1. Performing a detailed secondary survey (e.g. checking reflexes or clean dressing minor wounds) while the patient is hypotensive.\n2. Keeping an unstable patient in a non-trauma hospital to perform a CT scan instead of transferring them immediately.',
        safetyTips: '1. If the patient becomes hemodynamically unstable at any point, stop what you are doing and repeat the primary survey.',
        keyPoints: [
          'Resuscitate and stabilize primary survey life-threats first.',
          'The secondary survey is performed only after stabilization.',
          'Bypassing secondary diagnostics is appropriate for unstable patients requiring surgery.'
        ],
        summary: 'Prioritize trauma resuscitation based on the primary survey. Once stabilized, proceed to the secondary survey and diagnostics, or transfer the patient directly to the operating room if unstable.'
      }
    ]
  },
  // BLSO Course
  {
    id: 'c6',
    programId: 'p6',
    name: 'BLSO — Basic Life Support in Obstetrics',
    description: 'Management of childbirth emergencies, postpartum hemorrhage, shoulder dystocia, and maternal CPR.',
    progress: 0,
    preTestId: 'blso-pretest',
    postTestId: 'blso-posttest',
    modules: [
      {
        id: 'blso-m1',
        title: 'Maternal Resuscitation Basics',
        type: 'reading',
        duration: '20 min',
        completed: false,
        locked: true,
        learningObjectives: 'Explain the physiological changes in pregnancy that affect resuscitation, and position the patient to relieve aortocaval compression.',
        studyContent: 'Pregnancy causes significant anatomical and physiological changes that impact resuscitation:\n\nPhysiological Changes in Pregnancy:\n- Aortocaval Compression: When a pregnant woman (gestational age >= 20 weeks) lies flat on her back, the enlarged uterus compresses the inferior vena cava and aorta, reducing venous return and cardiac output by up to 30%.\n- Airway: Progesterone causes mucosal edema and airway narrowing. Intubate with a smaller tube (e.g. 6.0-6.5 mm).\n- Ventilation: Diaphragm is elevated; higher pressures may be needed to achieve chest rise.\n\nPositioning:\n- Manual Left Uterine Displacement (LUD): Use one or two hands to push the uterus to the patient\'s left side while they lie flat. This is the preferred technique during chest compressions.',
        clinicalScenario: 'A pregnant patient at 30 weeks gestation collapses in the clinic. You verify unresponsiveness and no pulse. While a colleague starts chest compressions, you place your hands on the right side of the patient\'s abdomen and push the uterus to the left. You maintain LUD throughout compressions.',
        algorithm: 'Maternal Collapse -> Confirm no pulse -> Start compressions -> Perform continuous manual Left Uterine Displacement (LUD) -> Deliver ventilations.',
        commonMistakes: '1. Resuscitating a pregnant patient flat on their back without performing uterine displacement (reduces CPR effectiveness).\n2. Tilting the entire patient to the left (makes performing chest compressions difficult; use manual displacement instead).',
        safetyTips: '1. Perform manual LUD from the patient\'s left side by pulling the uterus, or from the right side by pushing it.',
        keyPoints: [
          'Aortocaval compression reduces cardiac output during CPR by up to 30%.',
          'Perform manual Left Uterine Displacement (LUD) in pregnant patients >= 20 weeks.',
          'Keep the patient flat and displace the uterus manually during chest compressions.'
        ],
        summary: 'Maternal resuscitation must address aortocaval compression. Perform manual Left Uterine Displacement (LUD) to push the uterus to the left, restoring venous return during chest compressions.'
      },
      {
        id: 'blso-m2',
        title: 'Obstetric Emergencies',
        type: 'reading',
        duration: '20 min',
        completed: false,
        locked: true,
        learningObjectives: 'Diagnose preeclampsia and manage eclamptic seizures with Magnesium Sulfate and manage cord prolapse.',
        studyContent: 'Eclampsia:\n- Signs: Tonic-clonic seizures in a pregnant patient, often preceded by severe preeclampsia (BP >= 160/110 mmHg, proteinurea, headache, visual changes).\n- Treatment: Magnesium Sulfate (MgSO4) is the drug of choice. Give 4g IV loading dose over 15-20 minutes, followed by 1-2g/hour infusion. If seizures persist, give an additional 2g IV.\n- Magnesium Toxicity: Loss of deep tendon (patellar) reflexes, respiratory rate <12/min, or oliguria. Treat with Calcium Gluconate 1g IV.\n\nUmbilical Cord Prolapse:\n- Danger: The cord slips through the cervix ahead of the baby, compressing it and cutting off oxygen.\n- Treatment: Place the mother in knee-chest position. Insert a gloved hand into the vagina and push the presenting part (head) up off the cord. Keep your hand there until emergency C-section is performed.',
        clinicalScenario: 'A pregnant patient at 38 weeks starts seizing. You protect her airway, turn her on her side, and establish IV access. You administer Magnesium Sulfate 4g IV over 20 minutes. After 10 minutes, the seizure stops. You monitor her knee-jerk reflexes and respiratory rate.',
        algorithm: 'Maternal Seizure -> Protect airway -> MgSO4 4g IV load -> 2g/hr infusion -> Monitor reflexes & breathing -> If toxic signs -> Give Calcium Gluconate 1g IV.',
        commonMistakes: '1. Using Diazepam or Lorazepam as first-line treatment for eclampsia (Magnesium Sulfate is significantly more effective and safer for the baby).\n2. Trying to push a prolapsed umbilical cord back into the uterus (damages the cord; push the baby\'s head up instead).',
        safetyTips: '1. If deep tendon reflexes are absent or the respiratory rate drops below 12, stop the Magnesium infusion immediately.',
        keyPoints: [
          'Magnesium Sulfate is the drug of choice for eclamptic seizures.',
          'The antidote for Magnesium toxicity is Calcium Gluconate 1g IV.',
          'For cord prolapse, manually elevate the fetal head to relieve cord pressure.'
        ],
        summary: 'Manage eclamptic seizures with Magnesium Sulfate 4g IV, and monitor for toxicity (reflexes, respiration). For cord prolapses, elevate the fetal presenting part manually until surgical delivery.'
      },
      {
        id: 'blso-m3',
        title: 'Left Uterine Displacement',
        type: 'reading',
        duration: '20 min',
        completed: false,
        locked: true,
        learningObjectives: 'Demonstrate the correct techniques for manual Left Uterine Displacement (LUD) during resuscitation and procedures.',
        studyContent: 'Manual Left Uterine Displacement (LUD) is a critical skill for resuscitating pregnant patients. It pushes the gravid uterus off the inferior vena cava and abdominal aorta, restoring systemic circulation.\n\nLUD Techniques:\n1. One-Handed Push Technique (Performed from the patient\'s right side):\n   - Place the palm of your hand on the right side of the patient\'s abdomen, halfway between the hip and the navel.\n   - Push the uterus firmly upward and to the left.\n2. Two-Handed Pull Technique (Performed from the patient\'s left side):\n   - Place both hands on the left side of the patient\'s abdomen.\n   - Pull the uterus toward you (to the left).\n\nLUD must be maintained continuously during chest compressions, airway management, and defibrillation.',
        clinicalScenario: 'A pregnant patient collapses in cardiac arrest. Rescuers start CPR. You stand on the patient\'s right side, place your hand on the right lower quadrant of her abdomen, and push the uterus to the left. You hold this displacement while the compressor performs compressions and the AED delivers a shock.',
        algorithm: 'Cardiac Arrest in Pregnancy -> Start compressions -> Position hand on right side of abdomen -> Push uterus to the left (LUD) -> Maintain continuously until ROSC or PMCD.',
        commonMistakes: '1. Releasing the uterine displacement during rhythm checks or shock delivery.\n2. Pushing the uterus downward (toward the spine) instead of to the left, which worsens compression.',
        safetyTips: '1. The rescuer performing LUD must stand clear of the chest area to avoid interfering with compressions.',
        keyPoints: [
          'LUD is performed by pushing from the right or pulling from the left.',
          'LUD must be continuous and maintained throughout the resuscitation code.',
          'Do not tilt the patient\'s body; keep them flat for high-quality compressions.'
        ],
        summary: 'Perform manual Left Uterine Displacement (LUD) by pushing the uterus to the left from the right side, or pulling it from the left. LUD must be maintained continuously during CPR.'
      },
      {
        id: 'blso-m4',
        title: 'Maternal CPR',
        type: 'reading',
        duration: '20 min',
        completed: false,
        locked: true,
        learningObjectives: 'Perform maternal CPR, adjust hand placement, deliver standard shocks, and prepare for Perimortem Cesarean Delivery (PMCD) within 4 minutes.',
        studyContent: 'Maternal CPR Guidelines:\n- Hand Placement: Position your hands slightly higher on the sternum than in a normal adult, to adjust for the elevated diaphragm.\n- Defibrillation: Use standard adult energy levels. Shocks do not damage the fetal heart.\n- Perimortem Cesarean Delivery (PMCD) / Hysterotomy:\n  - If ROSC is not achieved within 4 minutes of initiating CPR on a pregnant woman (gestational age >= 20 weeks), prepare to perform an immediate cesarean delivery in-situ.\n  - The goal is to deliver the fetus by minute 5. This relieves aortocaval compression and improves the mother\'s chances of survival.',
        clinicalScenario: 'A 32-week pregnant patient collapses in cardiac arrest. CPR is started, and manual LUD is maintained. After two shocks and 4 minutes of resuscitation, there is no ROSC. The Team Leader directs the team to perform an immediate Perimortem Cesarean Delivery on the bed. The baby is delivered at minute 5, and the mother achieves ROSC immediately after delivery.',
        algorithm: 'Maternal Arrest -> CPR with LUD -> No ROSC at 4 minutes -> Perform PMCD/Hysterotomy immediately -> Deliver baby within 5 minutes -> Continue maternal CPR.',
        commonMistakes: '1. Delaying defibrillation shocks out of fear of harming the fetus (the fetus will not survive if the mother does not survive).\n2. Transporting the patient to the operating room for a C-section during arrest (PMCD must be performed in-situ immediately where the resuscitation is occurring).',
        safetyTips: '1. Continue maternal chest compressions and ventilations during the PMCD procedure.',
        keyPoints: [
          'Place hands slightly higher on the sternum during maternal CPR.',
          'Defibrillation and drug doses are identical to standard adult ACLS.',
          'PMCD must be performed in-situ if no ROSC is achieved after 4 minutes of arrest.'
        ],
        summary: 'Perform maternal CPR with slightly higher hand placement and continuous LUD. If ROSC is not achieved after 4 minutes of arrest, initiate an immediate Perimortem Cesarean Delivery (PMCD) in-situ to save both mother and baby.'
      },
      {
        id: 'blso-m5',
        title: 'Postpartum Hemorrhage Basics',
        type: 'reading',
        duration: '25 min',
        completed: false,
        locked: true,
        learningObjectives: 'Diagnose postpartum hemorrhage (PPH), identify causes (the 4 Ts), perform fundal massage, and administer uterotonics.',
        studyContent: 'Postpartum Hemorrhage (PPH) is defined as a cumulative blood loss >= 500 mL after vaginal delivery or >= 1000 mL after cesarean delivery, or blood loss causing signs of hypovolemia.\n\nCauses of PPH (The 4 Ts):\n1. Tone: Uterine atony (most common; uterus is soft, boggy, and fails to contract to compress blood vessels).\n2. Tissue: Retained placenta or clots.\n3. Trauma: Lacerations of the cervix or vagina, uterine inversion.\n4. Thrombin: Coagulopathy.\n\nManagement of Uterine Atony:\n- Fundal Massage: Perform firm, repetitive massage of the uterine fundus through the abdomen to stimulate contractions.\n- Uterotonics: Administer Oxytocin (10 units IM or 20-40 units in 1L saline IV infusion) first line. Alternatively, give Misoprostol (sublingual/rectal) or Methylergonovine (Methergine).\n- Bladder emptying: A full bladder prevents uterine contraction. Insert a Foley catheter.',
        clinicalScenario: 'Following a vaginal delivery, the patient loses 600 mL of blood. You palpate the abdomen and find the uterus is soft and boggy. You immediately begin firm fundal massage and start an Oxytocin infusion. You insert a Foley catheter to empty the bladder. Within 5 minutes, the uterus becomes firm and the bleeding stops.',
        algorithm: 'PPH diagnosed -> Call for help -> Fundal massage -> Administer Oxytocin -> Empty bladder -> Check for lacerations/retained tissue -> Bimanual compression if bleeding continues.',
        commonMistakes: '1. Delaying fundal massage while waiting for medications to be prepared.\n2. Giving Methylergonovine (Methergine) to a patient with preeclampsia or hypertension (causes severe vasoconstriction and stroke).',
        safetyTips: '1. If bleeding is refractory, perform bimanual uterine compression (one hand in the vagina pushing against the cervix, the other hand compressing the fundus through the abdomen).',
        keyPoints: [
          'PPH is blood loss >= 500 mL (vaginal) or >= 1000 mL (C-section).',
          'Uterine atony (lack of tone) is the most common cause.',
          'First-line treatments are fundal massage and Oxytocin infusion.',
          'Avoid Methergine in hypertensive patients.'
        ],
        summary: 'PPH is caused by Tone, Tissue, Trauma, or Thrombin. For uterine atony, perform immediate fundal massage, empty the bladder, and administer Oxytocin. Avoid Methergine in patients with high blood pressure.'
      },
      {
        id: 'blso-m6',
        title: 'Neonatal Handoff and Team Communication',
        type: 'reading',
        duration: '20 min',
        completed: false,
        locked: true,
        learningObjectives: 'Deliver structured handoff communication between maternal and neonatal resuscitation teams, and apply SBAR protocols.',
        studyContent: 'Resuscitation in obstetrics involves two distinct patients: the mother and the newborn. Smooth handoff and team communication are vital.\n\nStructured Handoff (SBAR Protocol):\n- Situation: State the reason for handoff (e.g. term newborn, floppy, post-shoulder dystocia).\n- Background: Antenatal history, maternal diabetes, meconium fluid, or fetal distress.\n- Assessment: Heart rate, Apgar scores, interventions performed (e.g. PPV delivered for 2 minutes).\n- Recommendation: Immediate plan (e.g. transfer to NICU for glucose check, monitor breathing).\n\nTeam Coordination:\n- The maternal resuscitation team and the neonatal resuscitation team must operate independently but coordinate resources, especially in cases of maternal arrest or severe hemorrhage.',
        clinicalScenario: 'A baby is delivered floppy after a difficult shoulder dystocia case. The midwife resuscitates the baby with PPV for 1 minute. The pediatric nurse arrives. The midwife hands over using SBAR: "This is a term infant born after shoulder dystocia (S). Maternal gestational diabetes (B). The baby was apneic at birth, heart rate is now 120 bpm after 1 minute of PPV, SpO2 is 88% (A). We recommend transferring to the NICU for monitoring and checking blood glucose (R)." The handoff is completed smoothly.',
        algorithm: 'Deliver Baby -> Perform Resuscitation -> Contact Neonatal Team -> Deliver SBAR Handoff -> Document care -> Debrief.',
        commonMistakes: '1. Giving a disorganized, unstructured verbal report that omits critical details like maternal risk factors or duration of ventilation.\n2. Failing to confirm who has primary responsibility for the baby during the transition.',
        safetyTips: '1. Always repeat back critical SBAR recommendation details to confirm closed-loop understanding.',
        keyPoints: [
          'Use SBAR (Situation, Background, Assessment, Recommendation) for neonatal transitions.',
          'Establish separate maternal and neonatal resuscitation leads.',
          'Confirm closed-loop understanding during handoffs.'
        ],
        summary: 'Coordinate care between maternal and neonatal teams. Use the SBAR communication protocol to ensure a structured, complete handoff of the newborn to the pediatric team.'
      }
    ]
  }
]

export const assessments = [
  // BLS Assessments
  {
    id: 'bls-pretest',
    courseId: 'c1',
    type: 'pre-test',
    title: 'BLS Course Pre-Test',
    timeLimit: 15,
    questions: [
      { id: 'bq1', text: 'What is the first step when you encounter an collapsed victim?', options: ['Give 2 rescue breaths', 'Verify the scene is safe', 'Check the carotid pulse', 'Deliver a shock with the AED'], correct: 1 },
      { id: 'bq2', text: 'What is the maximum time you should take to check for a pulse and breathing in BLS?', options: ['5 seconds', '10 seconds', '15 seconds', '20 seconds'], correct: 1 },
      { id: 'bq3', text: 'If a victim has a pulse but is not breathing, what is the correct action?', options: ['Start chest compressions immediately', 'Perform abdominal thrusts', 'Give rescue breaths (1 every 6 seconds)', 'Turn the patient onto their side and monitor'], correct: 2 },
      { id: 'bq4', text: 'How deep should you compress the chest of an adult during CPR?', options: ['At least 1 inch', 'At least 2 inches', 'At least 3 inches', 'Exactly 4 inches'], correct: 1 },
      { id: 'bq5', text: 'What is the correct compression-to-ventilation ratio for single-rescuer adult CPR?', options: ['15:2', '30:2', '5:1', '3:1'], correct: 1 }
    ]
  },
  {
    id: 'bls-posttest',
    courseId: 'c1',
    type: 'post-test',
    title: 'BLS Final Post-Test',
    timeLimit: 15,
    questions: [
      { id: 'bq6', text: 'How often should you switch compressors during CPR to prevent fatigue?', options: ['Every 5 minutes', 'Every 2 minutes', 'Every 1 minute', 'Only when the AED instructs'], correct: 1 },
      { id: 'bq7', text: 'What is the correct hand placement for chest compressions on an adult?', options: ['Upper half of the breastbone', 'Lower half of the breastbone', 'Left side of the chest over the heart', 'Over the xiphoid process'], correct: 1 },
      { id: 'bq8', text: 'If an unresponsive victim is breathing normally and has a pulse, what should you do?', options: ['Start chest compressions immediately', 'Give rescue breaths', 'Place in recovery position and monitor', 'Perform abdominal thrusts'], correct: 2 },
      { id: 'bq9', text: 'How do you open the airway of a victim with no suspected head or neck trauma?', options: ['Jaw-thrust maneuver', 'Head tilt-chin lift', 'Flex the neck forward', 'Perform a finger sweep'], correct: 1 },
      { id: 'bq10', text: 'What is the proper technique for relieving choking in a responsive infant?', options: ['Perform abdominal thrusts', 'Deliver 5 back blows and 5 chest thrusts', 'Do blind finger sweeps', 'Give 30 chest compressions'], correct: 1 }
    ]
  },

  // ACLS Assessments
  {
    id: 'acls-pretest',
    courseId: 'c2',
    type: 'pre-test',
    title: 'ACLS Course Pre-Test',
    timeLimit: 15,
    questions: [
      { id: 'aq1', text: 'Which of the following is a shockable cardiac arrest rhythm?', options: ['Asystole', 'Pulseless Electrical Activity (PEA)', 'Ventricular Fibrillation (VF)', 'Normal Sinus Rhythm'], correct: 2 },
      { id: 'aq2', text: 'What is the first drug given in all cardiac arrest cases?', options: ['Amiodarone', 'Lidocaine', 'Atropine', 'Epinephrine'], correct: 3 },
      { id: 'aq3', text: 'What does an ETCO2 reading of less than 10 mmHg during CPR indicate?', options: ['Inadequate chest compressions', 'Hyperventilation', 'Return of spontaneous circulation (ROSC)', 'Normal gas exchange'], correct: 0 },
      { id: 'aq4', text: 'What is the first-line medication for stable narrow-complex SVT?', options: ['Atropine', 'Amiodarone', 'Adenosine', 'Norepinephrine'], correct: 2 },
      { id: 'aq5', text: 'For unstable bradycardia, what is the initial medication dose of Atropine?', options: ['0.5 mg', '1 mg', '2 mg', '3 mg'], correct: 1 }
    ]
  },
  {
    id: 'acls-posttest',
    courseId: 'c2',
    type: 'post-test',
    title: 'ACLS Final Post-Test',
    timeLimit: 15,
    questions: [
      { id: 'aq6', text: 'What is the recommended target temperature range for Targeted Temperature Management (TTM)?', options: ['30°C to 32°C', '32°C to 36°C', '36°C to 37°C', '34°C to 38°C'], correct: 1 },
      { id: 'aq7', text: 'What is the first-line treatment for unstable bradycardia?', options: ['Amiodarone 150 mg IV', 'Adenosine 6 mg IV', 'Atropine 1 mg IV', 'Epinephrine 1 mg IV'], correct: 2 },
      { id: 'aq8', text: 'For QRS complexes wider than 0.12 seconds, what is a key stable tachycardia treatment option?', options: ['Atropine 1 mg', 'Amiodarone 150 mg IV over 10 min', 'Adenosine 12 mg rapid IV push', 'Synchronized cardioversion'], correct: 1 },
      { id: 'aq9', text: 'What is the first dose of Amiodarone for refractory VF/pulseless VT?', options: ['150 mg IV/IO', '300 mg IV/IO', '1 mg IV/IO', '6 mg IV/IO'], correct: 1 },
      { id: 'aq10', text: 'During cardiac arrest with an advanced airway in place, what is the correct ventilation rate?', options: ['1 breath every 6 seconds', '1 breath every 3 seconds', '1 breath every 10 seconds', '2 breaths after every 30 compressions'], correct: 0 }
    ]
  },

  // PALS Assessments
  {
    id: 'pals-pretest',
    courseId: 'c3',
    type: 'pre-test',
    title: 'PALS Course Pre-Test',
    timeLimit: 15,
    questions: [
      { id: 'pq1', text: 'What are the three components of the Pediatric Assessment Triangle (PAT)?', options: ['Airway, Breathing, Circulation', 'Appearance, Work of Breathing, Circulation to Skin', 'AVPU, Pulse, Respiration', 'Temperature, Blood Pressure, Heart Rate'], correct: 1 },
      { id: 'pq2', text: 'What is the preferred route for fluids and drugs in pediatric resuscitation if IV access cannot be established within 90 seconds?', options: ['Intramuscular (IM)', 'Subcutaneous (SC)', 'Intraosseous (IO)', 'Endotracheal (ET)'], correct: 2 },
      { id: 'pq3', text: 'What is the fluid bolus volume for a child in hypovolemic shock?', options: ['5 mL/kg', '10 mL/kg', '20 mL/kg', '50 mL/kg'], correct: 2 },
      { id: 'pq4', text: 'What is the correct compression-to-ventilation ratio for single-rescuer infant CPR?', options: ['30:2', '15:2', '3:1', '5:1'], correct: 0 },
      { id: 'pq5', text: 'At what heart rate should you start chest compressions in a pediatric patient with poor perfusion?', options: ['Heart rate < 40 bpm', 'Heart rate < 60 bpm', 'Heart rate < 80 bpm', 'Heart rate < 100 bpm'], correct: 1 }
    ]
  },
  {
    id: 'pals-posttest',
    courseId: 'c3',
    type: 'post-test',
    title: 'PALS Final Post-Test',
    timeLimit: 15,
    questions: [
      { id: 'pq6', text: 'What is the correct compression-to-ventilation ratio for two-rescuer pediatric CPR?', options: ['30:2', '15:2', '3:1', '5:1'], correct: 1 },
      { id: 'pq7', text: 'Which respiratory rate is abnormal for a sleeping 3-year-old child?', options: ['24 breaths/min', 'Less than 20 or greater than 40 breaths/min', '28 breaths/min', '32 breaths/min'], correct: 1 },
      { id: 'pq8', text: 'What is a primary clinical feature that indicates respiratory failure rather than respiratory distress?', options: ['Nasal flaring', 'Tachypnea', 'Altered level of consciousness or cyanosis', 'Intercostal retractions'], correct: 2 },
      { id: 'pq9', text: 'What is the first dose of Adenosine for stable SVT in children?', options: ['0.01 mg/kg', '0.1 mg/kg (max 6 mg)', '0.2 mg/kg', '1 mg/kg'], correct: 1 },
      { id: 'pq10', text: 'What is the correct depth of compressions in an infant?', options: ['At least 2 inches', 'About 1.5 inches (4 cm) or 1/3 AP chest diameter', 'At least 1 inch', 'Exactly 2.4 inches'], correct: 1 }
    ]
  },

  // NALS Assessments
  {
    id: 'nals-pretest',
    courseId: 'c4',
    type: 'pre-test',
    title: 'NALS Course Pre-Test',
    timeLimit: 15,
    questions: [
      { id: 'nq1', text: 'What are the 3 questions to assess a newborn immediately at birth?', options: ['Is fluid clear? Tone? Gestational age?', 'Is baby term? Good tone? Breathing or crying?', 'Heart rate? Respiratory rate? Apgar score?', 'Weight? Color? Cry?'], correct: 1 },
      { id: 'nq2', text: 'What is the time frame for the "Golden Minute" in neonatal resuscitation?', options: ['First 30 seconds', 'First 60 seconds', 'First 2 minutes', 'First 5 minutes'], correct: 1 },
      { id: 'nq3', text: 'What is the target heart rate above which positive pressure ventilation can be stopped?', options: ['60 bpm', '80 bpm', '100 bpm', '120 bpm'], correct: 2 },
      { id: 'nq4', text: 'What is the preferred compression-to-ventilation ratio for neonatal CPR?', options: ['15:2', '30:2', '3:1', '5:1'], correct: 2 },
      { id: 'nq5', text: 'Where should the pulse oximeter sensor be placed on a newborn?', options: ['Left hand', 'Right hand or wrist', 'Left foot', 'Right foot'], correct: 1 }
    ]
  },
  {
    id: 'nals-posttest',
    courseId: 'c4',
    type: 'post-test',
    title: 'NALS Final Post-Test',
    timeLimit: 15,
    questions: [
      { id: 'nq6', text: 'What is the correct compression-to-ventilation ratio for neonatal resuscitation?', options: ['15:2', '30:2', '3:1 (90 compressions, 30 breaths)', '5:1'], correct: 2 },
      { id: 'nq7', text: 'What oxygen concentration should be used to start PPV in a term newborn?', options: ['21% (room air)', '100% oxygen', '40% oxygen', '60% oxygen'], correct: 0 },
      { id: 'nq8', text: 'What is the first corrective action step in the "MR SOPA" sequence?', options: ['Open mouth', 'Suction airway', 'Mask adjustment and Reposition airway', 'Pressure increase'], correct: 2 },
      { id: 'nq9', text: 'What is the correct IV dose of epinephrine (1:10,000 solution) in newborns?', options: ['0.01 to 0.03 mL/kg', '0.1 to 0.3 mL/kg', '0.5 to 1 mL/kg', '1 to 2 mL/kg'], correct: 1 },
      { id: 'nq10', text: 'How should a preterm infant (<32 weeks) be managed immediately under the warmer?', options: ['Dried vigorously with towels', 'Placed directly into a food-grade plastic wrap/bag without drying', 'Bathed in warm water', 'Wrapped in a heavy cotton blanket'], correct: 1 }
    ]
  },

  // ATLS Assessments
  {
    id: 'atls-pretest',
    courseId: 'c5',
    type: 'pre-test',
    title: 'ATLS Course Pre-Test',
    timeLimit: 15,
    questions: [
      { id: 'tq1', text: 'What does the primary survey sequence ABCDE stand for?', options: ['Airway, Breathing, Circulation, Disability, Exposure', 'Assessment, Breathing, Circulation, Drugs, ECG', 'Airway, Blood pressure, Capillary refill, Defibrillation, Emergency', 'Action, Breathing, Circulation, Diagnosis, Evaluation'], correct: 0 },
      { id: 'tq2', text: 'What is the primary indicator that a trauma patient requires a definitive airway?', options: ['Heart rate > 120 bpm', 'Respiratory rate > 30 bpm', 'Glasgow Coma Scale (GCS) score <= 8', 'Systolic blood pressure < 90 mmHg'], correct: 2 },
      { id: 'tq3', text: 'What is the first-line treatment for a patient with a tension pneumothorax?', options: ['Immediate chest CT scan', 'Immediate chest tube insertion', 'Immediate needle decompression', 'Intubation and mechanical ventilation'], correct: 2 },
      { id: 'tq4', text: 'What is the balanced blood product transfusion ratio for massive transfusion protocol?', options: ['4 PRBC : 2 FFP : 1 Platelets', '1 PRBC : 1 FFP : 1 Platelets', '3 PRBC : 1 FFP : 0 Platelets', '2 PRBC : 1 FFP : 1 Platelets'], correct: 1 },
      { id: 'tq5', text: 'Which maneuver is used to open the airway of a trauma patient with a suspected neck injury?', options: ['Head tilt-chin lift', 'Jaw-thrust maneuver', 'Neck hyperextension', 'Finger sweep'], correct: 1 }
    ]
  },
  {
    id: 'atls-posttest',
    courseId: 'c5',
    type: 'post-test',
    title: 'ATLS Final Post-Test',
    timeLimit: 15,
    questions: [
      { id: 'tq6', text: 'What GCS score range defines a moderate head injury?', options: ['13-15', '9-12', '3-8', 'Less than 3'], correct: 1 },
      { id: 'tq7', text: 'What is the diagnostic scanning choice for detecting intra-abdominal blood in unstable trauma patients?', options: ['Abdominal MRI', 'Focused Assessment with Sonography for Trauma (FAST) scan', 'Barium swallow', 'Angiography'], correct: 1 },
      { id: 'tq8', text: 'What is the target ratio of blood products in a massive transfusion protocol (PRBC:FFP:Platelets)?', options: ['4:2:1', '1:1:1', '3:1:0', '2:2:1'], correct: 1 },
      { id: 'tq9', text: 'Which of the following should be avoided to prevent secondary brain injury in head trauma?', options: ['Maintaining oxygen saturation >95%', 'Hypotension (SBP <90 mmHg) and Hypoxia (SpO2 <90%)', 'Elevating the head of the bed', 'Administering Mannitol'], correct: 1 },
      { id: 'tq10', text: 'What is the emergency rescue procedure when a trauma patient cannot be intubated or ventilated?', options: ['Needle decompression', 'Surgical Cricothyroidotomy', 'Tracheostomy', 'Thoracotomy'], correct: 1 }
    ]
  },

  // BLSO Assessments
  {
    id: 'blso-pretest',
    courseId: 'c6',
    type: 'pre-test',
    title: 'BLSO Course Pre-Test',
    timeLimit: 15,
    questions: [
      { id: 'oq1', text: 'What is the cause of decreased cardiac output in a pregnant patient lying flat on her back?', options: ['Diaphragm elevation', 'Aortocaval compression', 'Increased blood volume', 'Respiratory distress'], correct: 1 },
      { id: 'oq2', text: 'How should the uterus be positioned during chest compressions in a pregnant patient?', options: ['Left lateral tilt of the whole body', 'Manual Left Uterine Displacement (LUD)', 'Manual Right Uterine Displacement (RUD)', 'Left flat position'], correct: 1 },
      { id: 'oq3', text: 'What is the first-line medication for eclamptic seizures?', options: ['Lorazepam', 'Phenobarbital', 'Diazepam', 'Magnesium Sulfate'], correct: 3 },
      { id: 'oq4', text: 'What is the most common cause of postpartum hemorrhage?', options: ['Uterine atony (Tone)', 'Retained placenta (Tissue)', 'Cervical laceration (Trauma)', 'Coagulopathy (Thrombin)'], correct: 0 },
      { id: 'oq5', text: 'What is the first-line medication for postpartum hemorrhage due to uterine atony?', options: ['Oxytocin', 'Misoprostol', 'Methylergonovine', 'Magnesium Sulfate'], correct: 0 }
    ]
  },
  {
    id: 'blso-posttest',
    courseId: 'c6',
    type: 'post-test',
    title: 'BLSO Final Post-Test',
    timeLimit: 15,
    questions: [
      { id: 'oq6', text: 'At what time of continuous cardiac arrest in a pregnant patient should a Perimortem Cesarean Delivery (PMCD) be performed?', options: ['After 15 minutes', 'Within 4 to 5 minutes of arrest', 'After 10 minutes', 'Only after transport to the OR'], correct: 1 },
      { id: 'oq7', text: 'What is the first-line anticonvulsant medication used to treat eclamptic seizures?', options: ['Diazepam 10 mg IV', 'Magnesium Sulfate (MgSO4) 4g IV loading', 'Phenytoin IV', 'Lorazepam 4 mg IV'], correct: 1 },
      { id: 'oq8', text: 'What is the antidote administered for Magnesium Sulfate toxicity?', options: ['Naloxone', 'Flumazenil', 'Calcium Gluconate 1g IV', 'Protamine Sulfate'], correct: 2 },
      { id: 'oq9', text: 'What is the first-line medication used to treat postpartum hemorrhage due to uterine atony?', options: ['Oxytocin', 'Misoprostol', 'Epinephrine', 'Magnesium Sulfate'], correct: 0 },
      { id: 'oq10', text: 'What is the primary maternal complication of a full bladder during the third stage of labor?', options: ['Uterine rupture', 'Uterine atony leading to postpartum hemorrhage', 'Shoulder dystocia', 'Placental abruption'], correct: 1 }
    ]
  }
]

// Custom high-quality, module-specific quizzes lookup
const customQuizzesLookup = {
  // BLS Module Quizzes
  'bls-m1': [
    { text: 'Which of the following is the second link in the Out-of-Hospital adult Chain of Survival?', options: ['Early Defibrillation', 'High-Quality CPR', 'Advanced Life Support', 'Post-Cardiac Arrest Care'], correct: 1 },
    { text: 'What is the maximum time you should spend checking for a pulse and breathing in BLS?', options: ['5 seconds', '10 seconds', '15 seconds', '20 seconds'], correct: 1 },
    { text: 'What is agonal gasping a sign of?', options: ['Normal sleeping breathing', 'Respiratory distress only', 'Cardiac arrest', 'Obstructed airway'], correct: 2 },
    { text: 'What is the first step in using an AED?', options: ['Attach the pads to the chest', 'Clear the patient for analysis', 'Power on the AED', 'Deliver the shock'], correct: 2 },
    { text: 'What is the primary cause of cardiac arrest in adults?', options: ['Respiratory failure', 'Cardiovascular diseases/arrhythmias', 'Opioid overdose', 'Severe trauma'], correct: 1 }
  ],
  'bls-m2': [
    { text: 'What is the correct depth of chest compressions for an adult patient?', options: ['At least 1 inch', 'At least 2 inches but not exceeding 2.4 inches', 'At least 3 inches', 'Exactly 1.5 inches'], correct: 1 },
    { text: 'What is the recommended compression rate for adult CPR?', options: ['80 to 100 per minute', '100 to 120 per minute', '120 to 140 per minute', '60 to 80 per minute'], correct: 1 },
    { text: 'Why is chest recoil important between compressions?', options: ['It allows the rescuer to rest', 'It prevents rib fractures', 'It allows blood to flow back into the heart chambers', 'It increases breathing volume'], correct: 2 },
    { text: 'Where should you place your hands to perform chest compressions on an adult?', options: ['On the upper half of the sternum', 'On the lower half of the sternum', 'Over the left nipple', 'Directly over the abdomen'], correct: 1 },
    { text: 'What is the compression-to-ventilation ratio for single-rescuer adult CPR?', options: ['15:2', '30:2', '5:1', '3:1'], correct: 1 }
  ],
  'bls-m3': [
    { text: 'Which airway maneuver is preferred for opening the airway of a patient with suspected neck trauma?', options: ['Head tilt-chin lift', 'Jaw-thrust maneuver', 'Neck flexion', 'Blind finger sweep'], correct: 1 },
    { text: 'What is the correct ventilation rate for an adult with a pulse but no breathing?', options: ['1 breath every 3 seconds', '1 breath every 6 seconds', '2 breaths every 10 seconds', '1 breath every 10 seconds'], correct: 1 },
    { text: 'What is the danger of delivering rescue breaths too quickly or too forcefully?', options: ['Severe hypocarbia', 'Gastric inflation and increased risk of vomiting/aspiration', 'Bronchoconstriction', 'Pulmonary embolism'], correct: 1 },
    { text: 'How long should each rescue breath last?', options: ['0.5 seconds', '1 second', '2 seconds', '3 seconds'], correct: 1 },
    { text: 'Which of the following describes the correct hand placement for holding a bag-mask in place?', options: ['The double-C grip', 'The E-C clamp technique', 'The thumb-press technique', 'The finger-spread hold'], correct: 1 }
  ],
  'bls-m4': [
    { text: 'Where should AED pads be placed on an adult victim?', options: ['Upper left chest and lower right chest', 'Upper right chest and lower left chest', 'Directly on the back between the shoulder blades', 'On both side ribs'], correct: 1 },
    { text: 'What should you do immediately after delivering an AED shock?', options: ['Check for a pulse', 'Resume chest compressions starting with compressions', 'Re-analyze the rhythm', 'Deliver 2 rescue breaths'], correct: 1 },
    { text: 'Which of the following is a shockable rhythm?', options: ['Asystole', 'Pulseless Electrical Activity (PEA)', 'Ventricular Fibrillation (VF)', 'Normal Sinus Rhythm'], correct: 2 },
    { text: 'What adaptation is required if the patient has a pacemaker bulge under the skin?', options: ['Do not use the AED', 'Place the pad directly over the pacemaker', 'Place the pad at least 1 inch away from the pacemaker', 'Use pediatric pads instead'], correct: 2 },
    { text: 'If the AED says "No shock advised", what should you do next?', options: ['Check for responsiveness', 'Immediately resume CPR starting with compressions', 'Wait for the AED to analyze again', 'Check the carotid pulse'], correct: 1 }
  ],
  'bls-m5': [
    { text: 'What is the first step in performing CPR on an unresponsive drowning victim?', options: ['Begin chest compressions immediately', 'Deliver 5 rescue breaths first', 'Turn the patient on their side to drain water', 'Perform abdominal thrusts'], correct: 1 },
    { text: 'How do you perform choking relief for a responsive choking infant?', options: ['Abdominal thrusts (Heimlich maneuver)', 'Cycles of 5 back blows and 5 chest thrusts', 'Blind finger sweeps in the mouth', 'Perform CPR immediately'], correct: 1 },
    { text: 'What modification is required for chest compressions in a late-term pregnant patient?', options: ['Position hands lower on the sternum', 'Perform continuous manual Left Uterine Displacement (LUD)', 'Position the patient in a prone posture', 'Compress at a depth of 3 inches'], correct: 1 },
    { text: 'If opioid overdose is suspected and the patient is not breathing but has a pulse, what should you administer?', options: ['Epinephrine', 'Amiodarone', 'Naloxone', 'Atropine'], correct: 2 },
    { text: 'For a responsive choking adult, where do you place your hands to deliver abdominal thrusts?', options: ['On the center of the breastbone', 'Just below the navel', 'Slightly above the navel, well below the breastbone', 'On the side of the waist'], correct: 2 }
  ],
  'bls-m6': [
    { text: 'Which of the following is NOT a defined role in a resuscitation team?', options: ['Compressor', 'Airway Manager', 'Recorder', 'Bystander Liaison'], correct: 3 },
    { text: 'How often should compressors switch roles during team CPR?', options: ['Every 5 minutes', 'Every 2 minutes or after 5 cycles of 30:2', 'Only when the compressor feels exhausted', 'After every ventilation phase'], correct: 1 },
    { text: 'What is the purpose of using feedback manikins during training?', options: ['To simulate vocal responses', 'To measure and improve compression rate and depth accuracy', 'To automatically deliver defibrillation shocks', 'To log attendance details'], correct: 1 },
    { text: 'What is the critical first phase of SBAR handover communication?', options: ['Situation', 'Background', 'Assessment', 'Recommendation'], correct: 0 },
    { text: 'What is the main goal of a structured debriefing after a resuscitation simulation?', options: ['To assign blame for errors', 'To review what went well, identify gaps, and reinforce clinical lessons', 'To calculate the billing cost of the simulation', 'To file a performance review report'], correct: 1 }
  ],

  // ACLS Module Quizzes
  'acls-m1': [
    { text: 'What defines Pulseless Electrical Activity (PEA)?', options: ['A flat line on the monitor', 'Organized electrical activity on the monitor without a palpable pulse', 'Rapid, wide QRS complexes with a strong pulse', 'Chaotic quivering baseline'], correct: 1 },
    { text: 'Which rhythm is shockable in cardiac arrest?', options: ['Asystole', 'Sinus Bradycardia', 'Ventricular Fibrillation', 'Pulseless Electrical Activity'], correct: 2 },
    { text: 'Which is a common reversible cause of PEA ("Hs & Ts")?', options: ['Hyperoxia', 'Hypothermia', 'Hypertension', 'Tachypnea'], correct: 1 },
    { text: 'How does fine VF differ from Asystole?', options: ['VF has small, chaotic electrical waves; Asystole has none', 'VF has wide QRS complexes; Asystole has narrow ones', 'Asystole is shockable; VF is not', 'There is no difference in treatment'], correct: 0 },
    { text: 'If the monitor shows a flatline, what is the immediate troubleshooting step?', options: ['Deliver a monophasic shock', 'Verify leads are connected and check in a second lead', 'Start an IV infusion of Amiodarone', 'Perform immediate intubation'], correct: 1 }
  ],
  'acls-m2': [
    { text: 'What biphasic energy level is standard for the first shock in cardiac arrest?', options: ['50-100 J', '120-200 J', '300 J', '360 J'], correct: 1 },
    { text: 'What ETCO2 value indicates that CPR compressions are inadequate?', options: ['< 10 mmHg', '> 15 mmHg', '> 20 mmHg', '> 35 mmHg'], correct: 0 },
    { text: 'During CPR, how should the defibrillator charging phase be managed?', options: ['Pause compressions to allow charging', 'Continue chest compressions while the device charges', 'Deliver a rescue breath during charging', 'Decrease compression depth'], correct: 1 },
    { text: 'A sudden, sustained rise in ETCO2 to 35-40 mmHg indicates what?', options: ['Esophageal intubation', 'Return of Spontaneous Circulation (ROSC)', 'Ventilator disconnection', 'Impeding asystole'], correct: 1 },
    { text: 'What diastolic blood pressure threshold is used to monitor compression quality in arterial lines?', options: ['Diastolic pressure > 10 mmHg', 'Diastolic pressure > 20 mmHg', 'Diastolic pressure > 40 mmHg', 'Diastolic pressure > 60 mmHg'], correct: 1 }
  ],
  'acls-m3': [
    { text: 'What is the first-line medication for unstable bradycardia?', options: ['Amiodarone 150 mg', 'Adenosine 6 mg', 'Atropine 1 mg', 'Epinephrine 1 mg'], correct: 2 },
    { text: 'What is the maximum cumulative dose of Atropine for bradycardia?', options: ['1 mg', '2 mg', '3 mg', '5 mg'], correct: 2 },
    { text: 'Unstable tachycardia is treated immediately with which intervention?', options: ['Amiodarone infusion', 'Adenosine rapid push', 'Synchronized cardioversion', 'Transcutaneous pacing'], correct: 2 },
    { text: 'What is the initial dose of Adenosine for stable narrow-complex SVT?', options: ['3 mg rapid IV', '6 mg rapid IV', '12 mg rapid IV', '150 mg IV'], correct: 1 },
    { text: 'Why must the "sync" mode be enabled on the defibrillator for cardioversion?', options: ['To deliver higher energy', 'To align the shock with the R-wave and avoid triggering VF', 'To speed up the charge time', 'To measure the patient\'s pulse rate'], correct: 1 }
  ],
  'acls-m4': [
    { text: 'What is the target timeframe for obtaining and interpreting a 12-lead ECG in suspected ACS?', options: ['Within 10 minutes', 'Within 20 minutes', 'Within 30 minutes', 'Within 1 hour'], correct: 0 },
    { text: 'What dose of Aspirin is recommended for acute coronary syndrome?', options: ['81 mg enteric-coated', '162 to 325 mg non-enteric chewable', '500 mg IV', '650 mg coated'], correct: 1 },
    { text: 'What is the maximum time window for fibrinolytic (tPA) administration in ischemic stroke from last known normal?', options: ['1 hour', '3 to 4.5 hours', '6 hours', '12 hours'], correct: 1 },
    { text: 'What diagnostic scan must be performed immediately for suspected stroke before fibrinolytics?', options: ['Chest X-ray', 'Non-contrast head CT scan', 'Brain MRI', 'ECG'], correct: 1 },
    { text: 'Which is a primary contraindication for Nitroglycerin administration in ACS?', options: ['Heart rate of 80 bpm', 'Systolic blood pressure < 90 mmHg', 'ST-elevation in lead II', 'Allergy to penicillin'], correct: 1 }
  ],
  'acls-m5': [
    { text: 'What is the correct ventilation rate during continuous CPR with an advanced airway in place?', options: ['1 breath every 3 seconds', '1 breath every 6 seconds', '2 breaths after every 30 compressions', '1 breath every 10 seconds'], correct: 1 },
    { text: 'What is the standard dose of Epinephrine given in cardiac arrest?', options: ['0.1 mg IV/IO', '1 mg IV/IO', '2 mg IV/IO', '10 mg IV/IO'], correct: 1 },
    { text: 'What is the first dose of Amiodarone for refractory VF/pulseless VT arrest?', options: ['150 mg', '300 mg', '5 mg/kg', '1 mg'], correct: 1 },
    { text: 'Which drug is an alternative antiarrhythmic to Amiodarone in ACLS cardiac arrest?', options: ['Atropine', 'Lidocaine', 'Adenosine', 'Dopamine'], correct: 1 },
    { text: 'How do you confirm correct placement of an endotracheal tube in ACLS?', options: ['Auscultating breath sounds and checking waveform capnography', 'Looking at chest rise only', 'Taking a chest X-ray immediately', 'Checking the pupil response'], correct: 0 }
  ],
  'acls-m6': [
    { text: 'What is the target Mean Arterial Pressure (MAP) during post-cardiac arrest care?', options: ['>= 50 mmHg', '>= 65 mmHg', '>= 80 mmHg', '>= 100 mmHg'], correct: 1 },
    { text: 'What is the recommended target temperature range for Targeted Temperature Management (TTM)?', options: ['30°C to 32°C', '32°C to 36°C', '36°C to 37°C', '34°C to 38°C'], correct: 1 },
    { text: 'What is the duration of Targeted Temperature Management (TTM) in post-arrest care?', options: ['At least 6 hours', 'At least 12 hours', 'At least 24 hours', 'At least 72 hours'], correct: 2 },
    { text: 'What SpO2 range should be targeted in the post-ROSC patient?', options: ['90-94%', '92-98%', '95-100%', 'Always 100%'], correct: 1 },
    { text: 'Which team communication method prevents errors during high-stress resuscitations?', options: ['Loud shouting', 'Closed-loop communication', 'Open discussions', 'Written logs only'], correct: 1 }
  ],

  // PALS Module Quizzes
  'pals-m1': [
    { text: 'What does the PAT evaluate?', options: ['Airway, Breathing, Chest rise', 'Appearance, Work of Breathing, Circulation to Skin', 'AVPU, Pulses, Temperature', 'Mental status, Heart rate, Skin temperature'], correct: 1 },
    { text: 'Which mnemonic checks child appearance in the PAT?', options: ['AVPU', 'TICLS', 'ABCDE', 'SAMPLE'], correct: 1 },
    { text: 'How long should a clinician take to perform the PAT doorway look?', options: ['Under 10 seconds', 'Under 30 seconds', '1 to 2 minutes', '5 minutes'], correct: 1 },
    { text: 'Mottled, pale, or cyanotic skin in the PAT indicates dysfunction of which system?', options: ['Respiratory system', 'Central nervous system', 'Cardiovascular/Circulation system', 'Endocrine system'], correct: 2 },
    { text: 'Stridor, grunting, and retractions are checked in which part of the PAT?', options: ['Appearance', 'Work of Breathing', 'Circulation to Skin', 'Disability'], correct: 1 }
  ],
  'pals-m2': [
    { text: 'What does the "D" in the ABCDE primary assessment stand for?', options: ['Drugs', 'Defibrillation', 'Disability', 'Decompression'], correct: 2 },
    { text: 'What capillary refill time is considered normal in a healthy child?', options: ['<= 1 second', '<= 2 seconds', '<= 4 seconds', 'Any time is normal if warm'], correct: 1 },
    { text: 'What is a late sign of shock in pediatric patients?', options: ['Tachycardia', 'Hypotension', 'Tachypnea', 'Capillary refill of 3 seconds'], correct: 1 },
    { text: 'Why must blood glucose be evaluated in critically ill children?', options: ['To check for diabetes', 'To identify hypoglycemia, which causes altered mental status and brain damage', 'To assess nutrition status', 'To calculate IV fluid rate'], correct: 1 },
    { text: 'How is the airway classified in the Airway assessment?', options: ['Clear, Maintainable, or Unmaintainable', 'Open or Closed', 'Intubated or Non-intubated', 'Stridorous or Silent'], correct: 0 }
  ],
  'pals-m3': [
    { text: 'What is a key difference between respiratory distress and respiratory failure?', options: ['Distress has a slow respiratory rate', 'Failure is characterized by altered mental status, slow/irregular breathing, or cyanosis', 'Distress requires immediate intubation', 'Failure has normal blood gases'], correct: 1 },
    { text: 'What is the correct bag-mask ventilation rate for pediatric respiratory failure?', options: ['10-12 breaths/min', '12-20 breaths/min', '20-30 breaths/min', '40-60 breaths/min'], correct: 2 },
    { text: 'What head position is recommended for ventilating infants?', options: ['Severe hyperextension (rose position)', 'Neutral sniffing position', 'Flexed chin-to-chest position', 'Left-turned posture'], correct: 1 },
    { text: 'What is agonal gasping a clinical sign of?', options: ['Deep sleep', 'Respiratory distress', 'Respiratory failure / impending cardiac arrest', 'Hyperventilation'], correct: 2 },
    { text: 'How long should each bag-mask ventilation breath be delivered over?', options: ['0.5 seconds', '1 second', '2 seconds', '3 seconds'], correct: 1 }
  ],
  'pals-m4': [
    { text: 'What is the preferred route for emergency fluids and drugs in pediatric resuscitation if IV access cannot be secured?', options: ['Central line', 'Intraosseous (IO)', 'Intramuscular (IM)', 'Endotracheal (ET)'], correct: 1 },
    { text: 'What is the standard fluid bolus dose for a child in hypovolemic shock?', options: ['10 mL/kg of D5W', '20 mL/kg of isotonic crystalloid (NS or LR)', '50 mL/kg of normal saline', '10 mL/kg of packed red blood cells'], correct: 1 },
    { text: 'In which type of shock should fluid bolus volumes be reduced and given slowly?', options: ['Septic shock', 'Anaphylactic shock', 'Cardiogenic shock', 'Hypovolemic shock'], correct: 2 },
    { text: 'Which is a sign of fluid overload to check after delivering a fluid bolus?', options: ['Tachycardia', 'Hepatomegaly and lung crackles (rales)', 'Dry mucous membranes', 'Elevated temperature'], correct: 1 },
    { text: 'Within what time frame should you proceed to IO access if IV lines cannot be established in a sick child?', options: ['30 seconds', '90 seconds', '5 minutes', '10 minutes'], correct: 1 }
  ],
  'pals-m5': [
    { text: 'What is the correct chest compression depth for a child (1 year to puberty)?', options: ['1.5 inches', 'About 2 inches (5 cm)', '2.4 inches', '3 inches'], correct: 1 },
    { text: 'What is the correct compression-to-ventilation ratio for two-rescuer infant CPR?', options: ['30:2', '15:2', '3:1', '15:1'], correct: 1 },
    { text: 'What is the preferred chest compression technique for two-rescuer infant CPR?', options: ['Two-finger technique', 'Two thumb-encircling hands technique', 'Heel of one hand', 'Two-hands interlocked'], correct: 1 },
    { text: 'What is the compression depth for an infant (< 1 year)?', options: ['About 1 inch', 'About 1.5 inches (4 cm) or 1/3 chest AP diameter', 'At least 2 inches', 'Exactly 2.4 inches'], correct: 1 },
    { text: 'What is the compression rate for all pediatric CPR?', options: ['80 to 100/min', '100 to 120/min', '120 to 140/min', '60 to 80/min'], correct: 1 }
  ],
  'pals-m6': [
    { text: 'At what heart rate should you start chest compressions in a pediatric patient with poor perfusion despite ventilation?', options: ['Heart rate < 40 bpm', 'Heart rate < 60 bpm', 'Heart rate < 80 bpm', 'Heart rate < 100 bpm'], correct: 1 },
    { text: 'What is the initial energy dose for manual defibrillation in children?', options: ['1 J/kg', '2 J/kg', '4 J/kg', '10 J/kg'], correct: 1 },
    { text: 'What is the weight-based dose of Epinephrine in PALS cardiac arrest?', options: ['0.1 mg/kg', '0.01 mg/kg', '1 mg/kg', '0.5 mg'], correct: 1 },
    { text: 'Which medication is used for refractory VF/pulseless VT arrest in PALS?', options: ['Atropine', 'Amiodarone', 'Adenosine', 'Norepinephrine'], correct: 1 },
    { text: 'What systolic blood pressure threshold is used to define hypotension in children aged 1-10 years?', options: ['< 60 mmHg', '< 70 mmHg + (2 x age in years)', '< 90 mmHg', '< 100 mmHg'], correct: 1 }
  ],

  // NALS Module Quizzes
  'nals-m1': [
    { text: 'Which of the following is NOT one of the 4 antenatal questions asked before delivery?', options: ['What is the expected gestational age?', 'Is the fluid clear?', 'How many babies are expected?', 'What is the maternal blood type?'], correct: 3 },
    { text: 'What is the correct suction pressure range for neonatal resuscitation?', options: ['40-60 mmHg', '80-100 mmHg', '120-150 mmHg', '150-200 mmHg'], correct: 1 },
    { text: 'What 3 criteria evaluate a newborn immediately after birth?', options: ['Color, Crying, Pulse', 'Term gestation, Good tone, Breathing/crying', 'Weight, Heart rate, Reflexes', 'Preductal SpO2, Temperature, Tone'], correct: 1 },
    { text: 'If a baby is term, has good tone, and is crying, what is the initial action?', options: ['Transfer to the radiant warmer', 'Provide positive pressure ventilation', 'Routine care with mother (dry, skin-to-skin)', 'Insert umbilical catheter'], correct: 2 },
    { text: 'What size endotracheal tube is generally prepared for a term infant?', options: ['2.0 mm', '2.5 mm', '3.5 mm', '5.0 mm'], correct: 2 }
  ],
  'nals-m2': [
    { text: 'What represents the "Golden Minute" in neonatal care?', options: ['The first 30 seconds of suctioning', 'The first 60 seconds after birth to complete initial steps, evaluate, and start PPV if needed', 'The time window to place a UVC line', 'The first minute of chest compressions'], correct: 1 },
    { text: 'What are the initial steps of newborn care under the warmer?', options: ['PPV and chest compressions', 'Warm, position airway, suction if obstructed, dry, and stimulate', 'Intubation and Epinephrine', 'Apgar scoring and weighing'], correct: 1 },
    { text: 'What heart rate threshold indicates the need for Positive Pressure Ventilation (PPV) at 60 seconds?', options: ['HR < 60 bpm', 'HR < 80 bpm', 'HR < 100 bpm', 'HR < 120 bpm'], correct: 2 },
    { text: 'How do you measure a newborn\'s heart rate rapidly at the warmer?', options: ['Palpating the femoral pulse', 'Listen to the precordium with a stethoscope for 6 seconds and multiply by 10', 'Palpating the umbilical cord for 30 seconds', 'Looking at the pulse oximeter only'], correct: 1 },
    { text: 'What is the primary indicator of successful initial steps in newborn care?', options: ['Pink skin color', 'Strong cry and heart rate > 100 bpm', 'Apgar score of 10', 'Active movement of limbs'], correct: 1 }
  ],
  'nals-m3': [
    { text: 'What is the correct ventilation rate for neonatal positive pressure ventilation (PPV)?', options: ['20-30 breaths/min', '30-40 breaths/min', '40-60 breaths/min', '80-100 breaths/min'], correct: 2 },
    { text: 'With what oxygen concentration should you start PPV for a term newborn?', options: ['21% oxygen (room air)', '30% oxygen', '60% oxygen', '100% oxygen'], correct: 0 },
    { text: 'Where must the pulse oximeter sensor be placed to monitor pre-ductal saturation in a newborn?', options: ['Left wrist', 'Right wrist or hand', 'Right foot', 'Left foot'], correct: 1 },
    { text: 'What is the target pre-ductal SpO2 range at 1 minute of life?', options: ['60-65%', '70-75%', '80-85%', '90-95%'], correct: 0 },
    { text: 'What initial ventilation pressure is recommended for a term newborn?', options: ['10-15 cm H2O', '20-25 cm H2O', '30-35 cm H2O', '40-50 cm H2O'], correct: 1 }
  ],
  'nals-m4': [
    { text: 'In MR SOPA, what do the first two letters "M" and "R" stand for?', options: ['Mouth suction, Resuscitation bag', 'Mask adjustment, Reposition airway', 'Measure heart rate, Rub back', 'Mouth open, Raise chin'], correct: 1 },
    { text: 'In MR SOPA, what are "S" and "O" corrective steps?', options: ['Stimulate, Oxygenate', 'Suction mouth/nose, Open mouth slightly', 'Squeeze bag, Observe chest rise', 'Secure tube, Obtain access'], correct: 1 },
    { text: 'What is the most critical indicator of effective positive pressure ventilation?', options: ['Heart rate of 80 bpm', 'Chest rise with each breath', 'Flushed skin color', 'High oxygen saturation reading'], correct: 1 },
    { text: 'If chest rise is not achieved during PPV, what is the final step of MR SOPA?', options: ['Start chest compressions', 'Alternative airway (Endotracheal tube or Laryngeal mask)', 'Administer Epinephrine', 'Increase pressure to 50 cm H2O'], correct: 1 },
    { text: 'Why is it critical to confirm chest rise before starting neonatal chest compressions?', options: ['Compressions are ineffective without lung aeration/oxygenation first', 'To prevent rib fractures', 'To ensure the baby does not vomit', 'To wait for the baby to cry'], correct: 0 }
  ],
  'nals-m5': [
    { text: 'What heart rate indicates the need for chest compressions in neonatal resuscitation?', options: ['HR < 40 bpm', 'HR < 60 bpm despite 30 seconds of effective PPV', 'HR < 80 bpm', 'HR < 100 bpm'], correct: 1 },
    { text: 'What is the coordinated compression-to-ventilation ratio for neonatal CPR?', options: ['15:2', '30:2', '3:1', '5:1'], correct: 2 },
    { text: 'What is the total number of chest compressions and ventilations delivered per minute in neonatal CPR?', options: ['100 compressions, 10 breaths', '90 compressions, 30 breaths', '120 compressions, 20 breaths', '60 compressions, 20 breaths'], correct: 1 },
    { text: 'What is the correct IV/IO dose of Epinephrine (1:10,000 solution) in newborns?', options: ['0.01 to 0.03 mL/kg', '0.1 to 0.3 mL/kg', '0.5 to 1.0 mL/kg', '1 to 2 mL/kg'], correct: 1 },
    { text: 'What oxygen concentration should be used when starting neonatal chest compressions?', options: ['21% (room air)', '40% oxygen', '100% oxygen', 'Same as initial setting'], correct: 2 }
  ],
  'nals-m6': [
    { text: 'How is thermoregulation managed for a preterm infant (<32 weeks) at birth?', options: ['Dried vigorously and wrapped in towels', 'Placed directly into a plastic wrap/bag up to the neck without drying', 'Bathed in warm water', 'Placed on a cold metal scale'], correct: 1 },
    { text: 'What blood glucose level is the threshold for managing hypoglycemia in a post-resuscitation newborn?', options: ['< 30 mg/dL', '< 45 mg/dL', '< 70 mg/dL', '< 100 mg/dL'], correct: 1 },
    { text: 'Therapeutic hypothermia in encephalopathic newborns should be initiated within how many hours of birth?', options: ['Within 2 hours', 'Within 6 hours', 'Within 12 hours', 'Within 24 hours'], correct: 1 }
  ],

  // ATLS Module Quizzes
  'atls-m1': [
    { text: 'What is the correct sequence of the ATLS primary survey?', options: ['A-B-C-D-E', 'C-A-B-D-E', 'A-B-C-E-D', 'E-D-C-B-A'], correct: 0 },
    { text: 'Cervical spine restriction is performed during which phase of the primary survey?', options: ['Airway (A)', 'Breathing (B)', 'Circulation (C)', 'Exposure (E)'], correct: 0 },
    { text: 'Which of the following is checked during the Breathing (B) phase?', options: ['Glasgow Coma Scale', 'Diastolic blood pressure', 'Tension pneumothorax and chest wall rise', 'Pelvic stability'], correct: 2 },
    { text: 'What represents the core prioritization rule of ATLS?', options: ['Treat minor wounds first', 'Identify and treat life-threats in sequence, resolving each before proceeding', 'Obtain a head CT scan before airway management', 'Document all findings before treating'], correct: 1 },
    { text: 'Hypothermia prevention is addressed in which phase of the primary survey?', options: ['Airway (A)', 'Circulation (C)', 'Disability (D)', 'Exposure (E)'], correct: 3 }
  ],
  'atls-m2': [
    { text: 'What Glasgow Coma Scale (GCS) score is the threshold indicating the need for a definitive airway?', options: ['GCS <= 6', 'GCS <= 8', 'GCS <= 10', 'GCS <= 12'], correct: 1 },
    { text: 'Which maneuver is preferred to open the airway of a trauma patient?', options: ['Head tilt-chin lift', 'Jaw-thrust maneuver', 'Neck hyperextension', 'Finger sweep'], correct: 1 },
    { text: 'Definitive airway refers to which of the following devices?', options: ['Oral airway (OPA)', 'Nasal airway (NPA)', 'Endotracheal tube with an inflated cuff', 'Laryngeal Mask Airway (LMA) without cuff'], correct: 2 },
    { text: 'Which is a primary contraindication for blind nasal intubation in trauma?', options: ['Femur fracture', 'Suspected basilar skull fracture', 'Abdominal injury', 'Hypotension'], correct: 1 },
    { text: 'How is C-spine protection maintained during endotracheal intubation?', options: ['Using a rigid collar only', 'Manual in-line stabilization', 'Taping the head to the table', 'No stabilization is needed during intubation'], correct: 1 }
  ],
  'atls-m3': [
    { text: 'Where is needle decompression performed for a tension pneumothorax in adults?', options: ['2nd intercostal space, midclavicular line', '5th intercostal space, anterior axillary line', '8th intercostal space, midaxillary line', '3rd intercostal space, parastental line'], correct: 1 },
    { text: 'What is the immediate treatment for an open pneumothorax?', options: ['Perform a surgical cricothyroidotomy', 'Sterile occlusive dressing taped on 3 sides', 'Perform immediate thoracotomy', 'Place a bilateral needle decompression'], correct: 1 },
    { text: 'A massive hemothorax is defined by the initial recovery of how much blood from the chest tube?', options: ['> 500 mL', '> 1000 mL', '> 1500 mL', '> 2000 mL'], correct: 2 },
    { text: 'What is paradoxical chest wall movement a sign of?', options: ['Tension pneumothorax', 'Open pneumothorax', 'Flail chest', 'Massive hemothorax'], correct: 2 },
    { text: 'How is a tension pneumothorax diagnosed in ATLS?', options: ['Through an immediate chest CT scan', 'Through a clinical exam (distended neck veins, absent breath sounds, shock)', 'Through an arterial blood gas', 'Through an emergency ultrasound (FAST) scan'], correct: 1 }
  ],
  'atls-m4': [
    { text: 'Which stage of hemorrhagic shock is characterized by hypotension and marked tachycardia?', options: ['Class I', 'Class II', 'Class III', 'Class IV'], correct: 2 },
    { text: 'What is the initial crystalloid fluid volume given to an adult in trauma shock?', options: ['500 mL', '1 Liter of warm NS/LR', '2 Liters of cold D5W', '5 Liters'], correct: 1 },
    { text: 'What is the recommended ratio of blood products during a massive transfusion protocol (PRBC:FFP:Platelets)?', options: ['4:2:1', '1:1:1', '3:1:0', '2:1:1'], correct: 1 },
    { text: 'What is the danger of resuscitating a trauma patient with massive volumes of cold crystalloids?', options: ['Acute kidney injury', 'Dilutional coagulopathy, hypothermia, and acidosis (Triad of Death)', 'Hypernatremia', 'Alkalosis'], correct: 1 },
    { text: 'Where should a pelvic binder be centered to stabilize a pelvic fracture?', options: ['Over the iliac crests', 'Over the greater trochanters of the femurs', 'Over the pubic symphysis only', 'Over the lower waist'], correct: 1 }
  ],
  'atls-m5': [
    { text: 'What is the maximum score on the Glasgow Coma Scale (GCS)?', options: ['10', '12', '15', '18'], correct: 2 },
    { text: 'What does a unilaterally dilated, sluggish pupil in a head trauma patient indicate?', options: ['Ocular trauma only', 'Intracranial mass effect / impending herniation', 'Drug toxicity', 'Normal variation'], correct: 1 },
    { text: 'How is the back of a trauma patient examined for spinal/perineal injuries?', options: ['By rolling the patient sideways individually', 'By logrolling the patient using a coordinated 4-person team', 'By sitting the patient upright', 'By taking a spinal X-ray only'], correct: 1 },
    { text: 'A patient opens eyes to verbal command, is disoriented, and withdraws from pain. What is the GCS?', options: ['GCS 10', 'GCS 11', 'GCS 12', 'GCS 13'], correct: 2 },
    { text: 'Why is hypothermia prevention critical in the Exposure phase?', options: ['Hypothermia increases bleeding and impairs coagulation enzymes', 'To make the patient comfortable', 'To prevent skin breakdown', 'To reduce heart rate'], correct: 0 }
  ],
  'atls-m6': [
    { text: 'When is the secondary survey performed in ATLS?', options: ['Immediately upon patient arrival', 'After the primary survey is complete, life-threats are treated, and vitals are stabilized', 'Simultaneously with the primary survey', 'In the radiology suite during CT scan'], correct: 1 },
    { text: 'For an unstable trauma patient with abdominal hemorrhage, what is the immediate destination?', options: ['Trauma ICU for observation', 'Operating room for emergency laparotomy', 'CT scanner for detailed imaging', 'Outpatient clinic'], correct: 1 },
    { text: 'What acoustic windows are checked during a Focused Assessment with Sonography for Trauma (FAST) scan?', options: ['Pericardial, Perihepatic, Perisplenic, Pelvic', 'Pleural, Gastric, Renal, Hepatic', 'Cardiac, Aortic, Femoral, Jugular', 'Pulmonary, Abdominal, Spinal, Cranial'], correct: 0 },
    { text: 'If a patient\'s vitals deteriorate during the secondary survey, what should the clinician do?', options: ['Complete the secondary survey quickly', 'Administer pain medication', 'Perform a re-evaluation of the primary survey (ABCDE)', 'Transfer the patient immediately'], correct: 2 },
    { text: 'What history protocol is used during the secondary survey?', options: ['SBAR', 'SOPAS', 'SAMPLE', 'TICLS'], correct: 2 }
  ],

  // BLSO Module Quizzes
  'blso-m1': [
    { text: 'What is the primary anatomical cause of decreased cardiac output in a supine pregnant patient?', options: ['Diaphragm elevation', 'Aortocaval compression of the IVC and aorta by the uterus', 'Edema of the airway', 'Increased thoracic pressure'], correct: 1 },
    { text: 'At what gestational age is aortocaval compression considered clinically significant during CPR?', options: ['At 12 weeks', 'At 20 weeks and above', 'At 36 weeks only', 'Immediately after conception'], correct: 1 },
    { text: 'What is the preferred technique to relieve aortocaval compression during resuscitation?', options: ['Tilting the entire bed 30 degrees to the right', 'Manual Left Uterine Displacement (LUD)', 'Placing a pillow under the patient\'s head', 'Turning the patient onto their side'], correct: 1 },
    { text: 'How do maternal airway changes in pregnancy affect intubation?', options: ['The airway is wider and easier to intubate', 'Progesterone causes mucosal edema and narrowing; a smaller ETT is required', 'Laryngoscopy is contraindicated', 'No adaptations are required'], correct: 1 },
    { text: 'What is the impact of manual LUD on venous return during chest compressions?', options: ['It has no effect', 'It increases venous return and cardiac output by up to 30%', 'It decreases blood pressure', 'It increases fetal heart rate only'], correct: 1 }
  ],
  'blso-m2': [
    { text: 'What is the first-line medication used to treat eclamptic seizures?', options: ['Diazepam', 'Lorazepam', 'Magnesium Sulfate (MgSO4)', 'Phenytoin'], correct: 2 },
    { text: 'What represents a sign of Magnesium Sulfate toxicity to monitor for?', options: ['Tachycardia', 'Loss of deep tendon (patellar) reflexes and respiratory rate < 12/min', 'Hypertension', 'Hyperactivity'], correct: 1 },
    { text: 'What is the antidote administered for Magnesium toxicity?', options: ['Naloxone', 'Flumazenil', 'Calcium Gluconate 1g IV', 'Protamine Sulfate'], correct: 2 },
    { text: 'What is the first action for umbilical cord prolapse?', options: ['Push the cord back into the uterus', 'Place mother in knee-chest position and manually elevate the presenting part off the cord', 'Clamp and cut the cord immediately', 'Perform fundal massage'], correct: 1 },
    { text: 'What is the eclamptic loading dose of Magnesium Sulfate?', options: ['1g IV', '2g IV', '4g IV over 15-20 minutes', '10g IM'], correct: 2 }
  ],
  'blso-m3': [
    { text: 'From which side of the patient is the manual LUD "push" technique performed?', options: ['Left side', 'Right side', 'Head of the bed', 'Foot of the bed'], correct: 1 },
    { text: 'From which side of the patient is the manual LUD "pull" technique performed?', options: ['Left side', 'Right side', 'Head of the bed', 'Foot of the bed'], correct: 0 },
    { text: 'Where should the hands be positioned to push the uterus to the left?', options: ['On the upper chest', 'On the right lower quadrant of the abdomen', 'On the pelvic bone', 'On the left hip'], correct: 1 },
    { text: 'Why is LUD preferred over a full lateral body tilt during CPR?', options: ['LUD allows high-quality chest compressions to be performed flat on a firm surface', 'LUD is less painful', 'LUD requires fewer rescuers', 'LUD increases fetal oxygenation better'], correct: 0 },
    { text: 'During maternal CPR, when is LUD maintained?', options: ['Only during the ventilation phase', 'Only during rhythm analysis', 'Continuously throughout the resuscitation', 'Only after the baby is delivered'], correct: 2 }
  ],
  'blso-m4': [
    { text: 'What adjustment is made to hand placement during chest compressions in maternal CPR?', options: ['Place hands lower on the sternum', 'Place hands slightly higher on the sternum to adjust for the elevated diaphragm', 'Place hands on the left side rib cage', 'Place hands over the abdomen'], correct: 1 },
    { text: 'What is the recommended timeframe to perform a Perimortem Cesarean Delivery (PMCD) if maternal ROSC is not achieved?', options: ['After 15 minutes of arrest', 'Initiate by minute 4, deliver fetus by minute 5 of arrest', 'After 10 minutes of arrest', 'Only after transporting to the operating room'], correct: 1 },
    { text: 'Which of the following is true regarding defibrillation in a pregnant patient?', options: ['Defibrillation energy levels should be reduced by half', 'Defibrillation is contraindicated', 'Standard adult energy levels and protocols are used', 'Pads must be placed over the abdomen'], correct: 2 },
    { text: 'Where should a Perimortem Cesarean Delivery (PMCD) be performed?', options: ['In the nearest operating room', 'In-situ immediately where the cardiac arrest is being resuscitated', 'In the labor and delivery suite only', 'In the emergency department CT room'], correct: 1 },
    { text: 'Does delivering the baby during maternal CPR improve maternal resuscitation?', options: ['No, it only helps the baby', 'Yes, it relieves aortocaval compression, improving venous return and chest compression effectiveness', 'It decreases maternal blood pressure', 'It increases maternal bleeding risk only'], correct: 1 }
  ],
  'blso-m5': [
    { text: 'How is postpartum hemorrhage (PPH) defined after a vaginal delivery?', options: ['Blood loss > 200 mL', 'Blood loss >= 500 mL', 'Blood loss >= 1000 mL', 'Blood loss causing high blood pressure'], correct: 1 },
    { text: 'What is the most common cause of postpartum hemorrhage (the 4 Ts)?', options: ['Tone (Uterine atony)', 'Tissue (Retained placenta)', 'Trauma (Laceration)', 'Thrombin (Coagulopathy)'], correct: 0 },
    { text: 'What is the first-line physical intervention for uterine atony?', options: ['Immediate C-section', 'Bimanual uterine compression', 'Firm abdominal fundal massage', 'Applying ice packs'], correct: 2 },
    { text: 'Which medication is a primary contraindication in a PPH patient with preeclampsia/hypertension?', options: ['Oxytocin', 'Methylergonovine (Methergine)', 'Misoprostol', 'Tranexamic Acid'], correct: 1 },
    { text: 'How does a full bladder contribute to postpartum hemorrhage?', options: ['It increases the risk of infection', 'It physically prevents the uterus from contracting, causing uterine atony', 'It compresses the femoral vein', 'It dilutes the blood'], correct: 1 }
  ],
  'blso-m6': [
    { text: 'What SBAR communication protocol term describes explaining the antenatal history and fluid conditions?', options: ['Situation', 'Background', 'Assessment', 'Recommendation'], correct: 1 },
    { text: 'What transition protocol is used during neonatal handoff?', options: ['Broselow tape', 'SBAR structured handoff', 'CPAP protocol', 'Apgar checklist only'], correct: 1 },
    { text: 'Who should lead the neonatal resuscitation team during a maternal emergency?', options: ['The same person leading the maternal team', 'A dedicated, separate lead for the neonatal resuscitation team', 'The nurse recording the case', 'The anesthesiologist only'], correct: 1 }
  ]
}

export const generateQuizzes = () => {
  const quizzes = []
  
  courses.forEach(course => {
    course.modules.forEach(mod => {
      // Find custom questions for this module
      const questionsList = customQuizzesLookup[mod.id] || [
        {
          text: `Which of the following represents a primary guideline highlighted in "${mod.title}"?`,
          options: [
            `Understand baseline diagnostics and follow evidence-based protocols.`,
            `Routine delay of all treatments until symptoms resolve.`,
            `Modify guidelines on-the-fly without checking stability parameters.`,
            `Avoid consulting secondary specialists in emergencies.`
          ],
          correct: 0
        },
        {
          text: `In a clinical setting related to "${mod.title}", what indicator should be checked immediately?`,
          options: [
            `Maternal billing code records.`,
            `Standard physiological indicators and airway patency.`,
            `The staff shift rotation schedule.`,
            `Subjective patient satisfaction metrics.`
          ],
          correct: 1
        },
        {
          text: `Which of the following is considered a common clinical pitfall in "${mod.title}"?`,
          options: [
            `Hyperventilating the patient or letting chest compressions pause too long.`,
            `Keeping the patient warm and dry under standard lights.`,
            `Confirming breathing and pulse in less than 10 seconds.`,
            `Applying manual left uterine displacement when performing CPR on pregnant patients.`
          ],
          correct: 0
        },
        {
          text: `What is the first-line step according to the protocol for "${mod.title}"?`,
          options: [
            `Establishing baseline stability (e.g. scene safety check, airway opening, or compression access).`,
            `Ordering a detailed chest CT scan.`,
            `Administering wide-spectrum antibiotics IV.`,
            `Scheduling a diagnostic case review.`
          ],
          correct: 0
        },
        {
          text: `What is a key clinical takeaway highlighted in the summary of "${mod.title}"?`,
          options: [
            `Resuscitation is static and assessments do not need repetition.`,
            `Continuous cycle of assessment, intervention, and reassessment ensures optimal outcomes.`,
            `Blood pressure is the only metric for tissue perfusion.`,
            `Gastric inflation has no effect on ventilation quality.`
          ],
          correct: 1
        }
      ]

      // Format questions array for database schema
      const questions = questionsList.map((q, index) => ({
        id: `${mod.id}-q${index + 1}`,
        text: q.text,
        options: q.options,
        correct: q.correct
      }))
      
      quizzes.push({
        id: `q_${mod.id}`,
        courseId: course.id,
        moduleId: mod.id,
        questions
      })
    })
  })
  
  return quizzes
}
