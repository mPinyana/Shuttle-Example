# Intro 
Bus inspection management cross-platform (Android & IOS) APP, involves logging inspection details on checklist, sketch marking, comments and images.
<br><br>
# Tech Stack
![Static Badge](https://img.shields.io/badge/Expo-%23000020?style=for-the-badge&logo=Expo&labelColor=black)
![Static Badge](https://img.shields.io/badge/react--native-61DBFB?style=for-the-badge&logo=React&labelColor=black)
![Static Badge](https://img.shields.io/badge/Node.JS-%235FA04E?style=for-the-badge&logo=Node.js&labelColor=black)
![Static Badge](https://img.shields.io/badge/JavaScript-%23F7DF1E?style=for-the-badge&logo=JavaScript&labelColor=black)
![Static Badge](https://img.shields.io/badge/Firebase-%23DD2C00?style=for-the-badge&logo=firebase&labelColor=black)
<br><br>
The application makes use four technologies, each fulfiling a specialised need which is:
<br>
<ul>
  <li>React-native (via Expo) to declare the structure for both operating systems</li>
  <li>Node.Js for the server environment</li>
  <li>JavaScript to handle all the logic and complex functionality behind the business logic</li>
  <li>JavaScript to handle all the logic and functionality</li>
  <li>Firebase services, mainly cloud firestore for the NoSQL database and cloud storage to store images</li>
</ul>
<br>

# Key Packages
For the basic features of the app to fucntion properly. It is key to note that these packages to not cover the entire functionality of the appplication 


- **Navigation**:  
  ![@react-navigation/native](https://img.shields.io/badge/@react--navigation/native-6.1.17-green) 
  ![@react-navigation/stack](https://img.shields.io/badge/@react--navigation/stack-6.4.1-green)
  ![react-native-tab-view](https://img.shields.io/badge/react--native--tab--view-3.5.2-green)

- **Animations**:  
  ![@lottiefiles/react-lottie-player](https://img.shields.io/badge/@lottiefiles/react--lottie--player-3.5.4-orange) 
  ![react-native-reanimated](https://img.shields.io/badge/react--native--reanimated-3.14.0-orange)

- **Graphics**:  
  ![react-native-svg](https://img.shields.io/badge/react--native--svg-15.6.0-yellow)

- **Media & Files**:  
  ![expo-image-picker](https://img.shields.io/badge/expo--image--picker-15.0.7-violet) 
  ![react-native-vision-camera](https://img.shields.io/badge/react--native--vision--camera-4.5.3-violet) 
  ![expo-file-system](https://img.shields.io/badge/expo--file--system-17.0.1-violet)

- **Database & Storage**:  
  ![firebase](https://img.shields.io/badge/firebase-10.12.2-blue)  
  ![@react-native-async-storage/async-storage](https://img.shields.io/badge/@react--native--async--storage/async--storage-1.23.1-blue) 
  ![@react-native-firebase/storage](https://img.shields.io/badge/@react--native--firebase/storage-20.4.0-blue)

- **UI Components**:  
  ![react-native-modal](https://img.shields.io/badge/react--native--modal-13.0.1-brown) 
  ![react-native-tab-view](https://img.shields.io/badge/react--native--tab--view-3.5.2-brown) 
  ![react-native-toast-message](https://img.shields.io/badge/react--native--toast--message-2.2.0-brown) 
  ![react-native-bouncy-checkbox](https://img.shields.io/badge/react--native--bouncy--checkbox-4.0.1-brown)

For a complete list of dependencies, see [`package.json`](./package.json).

<br>

# How to run and test 
App has yet to be deployed, to run and test one has to pull it to their editor and firstly
<br>
Run the the following commands in the terminal to set up the environment **after installing Node.js** from the node website <br>

- Install expo cli if not already installed

```bash
  npm install -g expo-cli
```

- Install/activate all dependencies
```bash
npm install
```
<br>

- Run the application
```bash
npx expo start
```
<br>

# App Features 
The main benefits of the application are outlined in the subheadings below. Ofcourse these are not the full capabilities of the application but the important ones, that add the most business value
<br>
## 1. Assigning Inspections
This is the inception of the entire inspection process, where the user responsible, the time and the vehicle being being inspected are specified.<br>This implemented by pickers to mitigate errors and is more intuitive.
<br>
![Screenshot_1728961029](https://github.com/user-attachments/assets/4d4e35c4-426f-47e1-bddc-9b9e1f6c3820)
<space> 
![Screenshot_drv1](https://github.com/user-attachments/assets/128efb05-d1d0-45c7-b8ad-bc5f0fe6dc97)
<space> 
![Screenshot_T](https://github.com/user-attachments/assets/a5e7cad5-1832-440d-a8c9-ac946bb4afde)




<br><br>
## 2. Conducting Inspection 
The user has to record their observations about the vehicle's condition in three broad steps. <br>
<ul>
  <li>Complete a checklist, which has 7 pages</li>
  <li>Mark damage on blueprint</li>
  <li>Additional info: comments and photos</li>
</ul>

![Screenshot_Check](https://github.com/user-attachments/assets/0d8654ff-020b-4b87-8f63-cab8455fb852)
<space> 
![Screenshot_Sketch](https://github.com/user-attachments/assets/17e88204-d28e-4de4-a96e-f60f5ba698e8)
<space> 
![Screenshot_Comment](https://github.com/user-attachments/assets/0843d788-5be9-45bf-a0fe-4336363c5b75)
<space> 
![Screenshot_Cam](https://github.com/user-attachments/assets/3730373a-8609-4268-8d78-af7ee5844b56)



<br><br>
## 3. Viewing Vehicle condition
Conversely, the observed details in the inspection need to be organised according to the relevant bus/vehicle for management to make decisions accordingly.

In thsis part, the user has accesss to:

<ul>
  <li>A landing page tha lists all vehicles currently in the fleet, which  has preview of the most recent pic and default  pic for those not yet inspected</li>
  <li>A list of all inpection conducted on the vehicle</li>
  <li>Obviously, a display the information specified during the inspecting process before</li>
</ul>

<br><br>
