Problem Statement number-12
Team Number: 33

Team Members:

1.Krishna Kanta Sahoo(Team Leader)

2.Debasish Pradhan

3.Bijay Kumar Mohanty

4.Kanha Jaiswal

Institute Name - VEER SURENDRA SAI UNIVERSITY OF TECHNOLOGY , BURLA


prototype link - https://womensafeapplatest.vercel.app


flowchart -->

![Image](https://github.com/user-attachments/assets/d87d1fd6-d3a0-456a-89db-d76de6af90d6)


App Manual :

1.  click the prototype to open the Sahaaya app, it will open the flash page, in which get started button is there.

USER :

3.  after clicking the get started button login page will be there, for the first time you need to create acount.
   
2.  click the create account button, it will open the create account page. after account is created it will open the first page of Sahaaya . the first page contains the main functionality of Sahaaya .
i.e tapping 6 times the screen to activate it.
There are also two buttons at the top right corner , one of them is a police dashboard button, another one is settings button.Tap 6 times and it will be activated and it will send your details automatically to the nearby police stations which can be viewed in the police dashboard section.
Additionally it will also record  the voice of the user.
    
POLICE DASHBOARD :
In the police dashboard there are two main buttons in the navigation bar
1.cases
2.Dispatch room,
Cases will show the status of the users and Dispatch room will show the details of PCR.

FUTURE SCOPE :

The Sahaaya Women Safety Application has strong potential for further enhancement and large-scale deployment. While the current prototype demonstrates the core SOS functionality, background tracking, and hybrid offline–online emergency system, several advanced features can be implemented in future versions to increase efficiency, reliability, and real-world impact.
The future scope of this project includes the following developments:

1. AI Powered Threat Detection

AI model to analyze background audio that detects keywords like 'help' , 'save me' , 'stop' .

2. Offline Mesh Network Support

Send sms even when no network,internet and in remote areas also.

3. Predictive safety Analysis

Heat maps for unsafe zones.

Time-based safety scores for areas.

Suggest safe routes for women based on crime data.

Early warning alerts when entering risky locations.
   

APP DETAILS :

Sahaaya is a smart women-safety application that works both offline and online, ensuring help reaches even when there is no internet.
The app is activated using a secret 6-tap gesture on the screen, allowing women to send an emergency alert silently.

We developed only a prototype of the Sahaaya app to illustrate how it would function in a real-life scenario. The prototype effectively demonstrates its key features and workflows.

KEY FEATURES :
1.6-Tap SOS Trigger – User taps anywhere on screen 6 times to activate SOS, even if phone is locked and screen is ON.

2.Offline SOS (SMS) – Sends the victim’s location and emergency message to saved contacts and nearby police station using SMS, even without internet.

3.Online SOS – When internet is available, the app sends live location updates to a backend server, police dashboard, guardians, and nearby responders.

4.Background Tracking – App continuously sends location updates every few seconds until the case is resolved.

5.Community Responders – Verified users within 500m receive alerts to help the victim safely.

6.Police Dashboard – Live map interface showing victim’s movement, distance, speed, nearby responders, and case controls.

7.Stealth Mode – SOS activates silently with hidden UI and secret “I am safe” as a cancel option.

TECHNOLOGY USED:

Frontend: React Native(user app) , Typescript

Backend: Node.js/FastAPI, WebSockets(live tracking)

Database: PostgreSQL + PostGIS(for geo-queries)

Offline Features: Android native SMS, background service

Online Features: Firebase Push Notifications, Google Maps API

DESCRIPTION :

Our women safety app 'Sahaaya' activates without opening the app , not even without switching on the app. 
To activate it, user just need to tap the phone screen 6 times and it will automatically send an alert to police stations nearby . 
Through this app the police can track the women with the help of gps and google maps and the app will also send an alert to all users nearby 500m radius around the women to create a strong community .
The police can even find out which users are most nearest to her. The app will update the location of the women every 10 seconds and police also gets the recording of the background noice, her voice , screaming to understand the situation even better.
There will be a dashboard of the nearby police officers and police stations and there will be a emergency contact list in which the person listed in the list will be alerted.
There will be a safe button by clicking which will asure that she is fine .
To avoid misuse of the app there will be time period of 10 secs within which if the safe button is clicked there wont be any penalty.

In traditional emergency situations, victims often struggle to seek help quickly due to long response times and ineffective alert systems. Earlier, women had to unlock their phones, open an app, or manually call emergency numbers, which caused critical delays during danger. Police usually received incomplete information, lacked real-time location updates, and faced difficulty pinpointing victims in crowded or moving environments. Poor network connectivity further slowed down alerts, leaving police unable to react immediately.

Sahaaya overcomes these challenges by introducing a fast, reliable, and intelligent hybrid SOS system. The app enables users to trigger an SOS silently through a 6-tap gesture, eliminating the need to unlock or navigate the phone. It instantly captures the user’s GPS location and sends alerts to police through offline SMS when there is no internet, ensuring the message is always delivered. When online, Sahaaya streams live location updates every few seconds to a dedicated police dashboard, showing the victim’s movement trail, direction, and speed. This allows officers to respond quickly and accurately. Additionally, Sahaaya alerts nearby community responders within 500 meters, enabling immediate local assistance even before police arrive.

Overall, Sahaaya transforms the emergency response process by reducing alert delays, providing precise real-time data, and creating a multi-channel rescue network. This leads to significantly faster police alerts and quicker response time, directly improving safety outcomes for women.
