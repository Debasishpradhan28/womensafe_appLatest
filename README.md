prototype link - https://womensafeapplatest.vercel.app

flowchart:
link- https://github.com/Debasishpradhan28/womensafe_appLatest/blob/master/flowchart.jpg

Problem Statement number-12
Team Number: 33

Team Members:
      1.Krishna Kanta Sahoo(Team Leader)
      2.Debasish Pradhan
      3.Bijay Kumar Mohanty
      4.Kanha Jaiswal

Institute Name - VEER SURENDRA SAI UNIVERSITY OF TECHNOLOGY , BURLA

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

7.Stealth Mode – SOS activates silently with hidden UI and secret “I am safe” cancel option.

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
