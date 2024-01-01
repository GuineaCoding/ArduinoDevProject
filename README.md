<!DOCTYPE html>
<html>
<head>
<title>Home-Sphere README</title>
</head>
<body>

<div align="center">
    <img src="../ArduinoDevProject/src/assets/images/appLogo.png" alt="Home-Sphere Logo" width="200"/>
</div>

<h1 align="center">Home-Sphere</h1>

<h2>Project Overview</h2>
<p>Home-Sphere is an innovative project designed to establish seamless communication between Arduino, Firebase, and an Ionic app. It aims to create a robust system for real-time data transmission and visualization, enhancing home automation and monitoring experiences. </p>

<h2>Why chose Home-sphere?</h2>
<p>The project facilitates real-time communication and data exchange between an Arduino setup and a mobile application platform. It leverages Firebase for data management and an Ionic app for user-friendly data visualization.</p>

<h2>Technologies Used to achieve this wonderfull sollution:</h2>
<ul>
    <li><a href="https://store.arduino.cc/products/explore-iot-kit-rev2" target="_blank">Arduino MKR IoT Carrier Rev2</a></li>
    <li><a href="https://firebase.google.com/" target="_blank">Firebase</a></li>
    <li><a href="https://ionicframework.com/" target="_blank">Ionic Framework</a></li>
    <li><a href="https://developer.android.com/studio" target="_blank">Android Studio</a></li>
    <li><a href="https://www.chartjs.org/" target="_blank">Chart.js</a></li>
    <li>Feel free to check and the project's package.json for other apps but the main one i already lsited</li>
</ul>

<div style="display: flex; justify-content: center; align-items: center;">
    <img style="width:20%; height: 150px" src="https://store.arduino.cc/cdn/shop/products/AKX00044_02.unbox_1000x750.jpg?v=1680610812" alt="Image 1" width="100"/>
    <img style="width:20%; height: 150px"src="https://firebase.google.com/static/images/brand-guidelines/logo-built_black.png" alt="Image 2" width="100"/>
    <img style="width:20%; height: 150px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Ionic-logo-landscape.svg/1920px-Ionic-logo-landscape.svg.png" alt="Image 3" width="100"/>
    <img style="width:20%; height: 150px" src="https://techcrunch.com/wp-content/uploads/2017/02/android-studio-logo.png?w=1390&crop=1" alt="Image 4" width="100"/>
    <img style="width:20%; height: 150px" src="https://caefn.com/wp-content/uploads/2019/06/chartjs-e1560684806991.png" alt="Image 5" width="100"/>
</div>

<h2>Installation Instructions</h2>
<p>To set up and run the Home-Sphere project, follow these steps:</p>
<ul>
<li><strong>Arduino Setup:</strong> Ensure you have an <a href="https://store.arduino.cc/products/arduino-mkr-iot-carrier">Arduino MKR IoT Carrier Rev2</a>. Set it up according to the official Arduino guidelines.</li>
    
<li><strong>Create a Firebase Project:</strong> Go to <a href="https://firebase.google.com/learn/pathways/firebase-web">Firebase</a> and create a new project for web applications. Follow the provided instructions to set up Firebase for your project. </li>

<li><strong>Clone and Install the Project:</strong>
        <ul>
            <li>Clone the project from GitHub to your local machine.</li>
            <li>Open a terminal or command prompt in the project directory.</li>
            <li>Run <code>npm install</code> to install all required dependencies.</li>
        </ul>
    </li>

<li><strong>Run the Ionic App:</strong>
        <ul>
            <li>Within the project directory, run <code>ionic serve</code> to start the app in development mode.</li>
            <li>Open your web browser and navigate to <code>http://localhost:8100</code> to view the app.</li>
        </ul>
    </li>

 <li><strong>Build the Ionic App:</strong>
        <ul>
            <li>Run <code>ionic build</code> to build the app for production.</li>
            <li>For Android APK, ensure you have Android Studio installed and then follow Ionic's native build instructions to generate an APK file.</li>
        </ul>
    </li>
</ul>
<p>Note: Ensure that your Firebase project settings and configuration are correctly integrated into the Ionic app. This includes updating the Firebase configuration in the appropriate files within the Ionic project.</p>


<h2>Usage</h2>
<p>The Home-Sphere app offers a comprehensive and user-friendly interface for monitoring various environmental parameters. Here's how you can navigate and utilize the app:</p>

<ul>
    <li><strong>Signing Up and Logging In:</strong> Users can easily sign up for an account and log in to access the app's features. There's also an option to reset the password if needed.</li>

<li><strong>Main Dashboard:</strong> Upon logging in, users are greeted with the Home page, which serves as the central control panel. Here, users can view the latest updates from the connected sensors.</li>

 <li><strong>Real-Time Data Display:</strong> The Home page displays key environmental data such as temperature, humidity, pressure, moisture, and CO2 levels. Each parameter is presented in a dedicated card with a clear and concise layout.</li>

 <li><strong>Detailed View:</strong> Users can click on 'View Details' for each parameter to navigate to a more detailed view, providing in-depth information and historical data.</li>

<li><strong>Interactive Charts:</strong> In the detailed view, users can interact with dynamic charts that display trends over different timeframes such as the last hour, day, week, month, or year.</li>

 <li><strong>Security Monitoring:</strong> The app also provides a security section where users can monitor the PIR sensor status, enhancing the home's security system.</li>

 <li><strong>Logout Functionality:</strong> Users can securely log out of the app using the Logout button located in the top-right corner of the Home page.</li>
</ul>

<p>The app's intuitive design and interactive features make it easy for users to monitor and analyze environmental conditions in real-time, ensuring a comfortable and safe home environment.</p>

<h2>Features</h2>
<p>Home-Sphere is not only a comprehensive solution for home monitoring and automation but also a cost-effective approach for households aiming to enhance their living environment. Here are the key features:</p>

<ul>
    <li><strong>Cost-Effective Solution:</strong> Designed to be affordable, Home-Sphere is an ideal choice for households looking to monitor their environment and wellbeing without incurring significant expenses.</li>

<li><strong>Real-Time Sensor Data Monitoring:</strong> Utilizes the Arduino MKR IoT Carrier Rev2 to continuously monitor various environmental conditions, providing valuable insights.</li>

<li><strong>Firebase Integration:</strong> Seamlessly integrates with Firebase for efficient, reliable, and secure data storage and retrieval.</li>

 <li><strong>Interactive Data Visualization:</strong> Features an intuitive and user-friendly interface in the Ionic app, complete with real-time charts and graphs for easy data interpretation.</li>

 <li><strong>Motion Detection:</strong> Includes a PIR sensor for enhanced security and through motion detection.</li>

<li><strong>Holiday Mode:</strong> Offers a 'holiday mode' for additional monitoring and alerts, ensuring peace of mind while away from home.</li>

 <li><strong>Mobile App Functionality:</strong> Employs the Ionic framework to create a cross-platform mobile application, facilitating remote monitoring and control.</li>

<li><strong>Android APK Generation:</strong> Enables the building of an Android APK from the Ionic app, simplifying installation and use on Android devices.</li>
</ul>
<li><strong>You can also generate the project on IOS, feel free to follow the instructions for the IOS</strong>
</ul>

<p>Home-Sphere brings together these features to offer a versatile and robust system suitable for a wide range of home monitoring tasks. It stands out as an accessible and budget-friendly option for enhancing home safety, comfort, and efficiency.</p>

<h2>App Demo And Image samples</h2>
<p>Image samples</p>
<div align="center">
    <a href="https://www.dropbox.com/scl/fi/40yqvr7fp73p57r2y138i/511.jpg">
        <img style="width:20%; height: 150px" src="https://www.dropbox.com/scl/fi/40yqvr7fp73p57r2y138i/511.jpg" alt="Image 1"/>
    </a>
    <a href="https://www.dropbox.com/scl/fi/ghaovitwfctny5kkycus6/512.jpg">
        <img style="width:20%; height: 150px" src="https://www.dropbox.com/scl/fi/ghaovitwfctny5kkycus6/512.jpg" alt="Image 2"/>
    </a>
    <a href="https://www.dropbox.com/scl/fi/frljih7ujkiaby4z9ydg6/513.jpg">
        <img style="width:20%; height: 150px" src="https://www.dropbox.com/scl/fi/frljih7ujkiaby4z9ydg6/513.jpg" alt="Image 3"/>
    </a>
    <a href="https://www.dropbox.com/scl/fi/ji0kxfs41qdxk61zhzea0/514.jpg">
        <img style="width:18%; height: 150px" src="https://www.dropbox.com/scl/fi/ji0kxfs41qdxk61zhzea0/514.jpg" alt="Image 4"/>
    </a>
    <a href="https://www.dropbox.com/scl/fi/gdztznbx4d3u5132g9zdk/515.jpg">
        <img style="width:20%; height: 150px" src="https://www.dropbox.com/scl/fi/gdztznbx4d3u5132g9zdk/515.jpg" alt="Image 5"/>
    </a>
</div>



<a href="https://www.dropbox.com/scl/fi/l37qlphdl4dt47g0p632m/video.mp4" height="480px" width="640px" allowfullscreen>Video Sample</a>


<h2>Contribution Guidelines and Contact Information</h2>
<p>For support or queries, feel free to contact me at andrian.barbulat@gmail.com</p>
</body>
</html>


