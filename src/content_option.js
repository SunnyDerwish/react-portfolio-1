import imgA from "./assets/images/imgA.jpg";
import imgB from "./assets/images/imgB.jpg";
import imgC from "./assets/images/imgC.jpg";

const logotext = "David";
const meta = {
    title: "David Al-Feghali",
    description: "Fill in later",
};

const introdata = {
    title: "David Al-Feghali",
    animated: {
        first: "Web Developer",
        second: "Front-End",
        third: "Back-End",
    },
    description: "I'm a versatile web developer with expertise in ThreeJS, Laravel, JavaScript, TypeScript, and NextJS, skilled in both front-end and back-end development. I focus on creating functional, visually engaging, and scalable full-stack solutions while leveraging my background in other industries to meet user needs and drive business goals.",
    your_img_url: "https://i.ebayimg.com/images/g/KngAAOSwestkFine/s-l1200.jpg",
};

const dataabout = {
    title: "Why me?",
    aboutme: "I'm a versatile web developer with a strong foundation in modern technologies like ThreeJS, Laravel, JavaScript, TypeScript, and NextJS. My experience spans both front-end and back-end development, allowing me to build full-stack solutions that are not only functional but also visually engaging and user-friendly. I bring a keen attention to detail, ensuring that every project I work on is optimized for performance and scalability. With a background in sales and customer interaction, I also understand the importance of creating solutions that meet user needs and drive business goals. I'm passionate about continuous learning and excited to contribute my skills to a dynamic development team, making me a well-rounded and valuable addition to any project.",
};
const worktimeline = [
    {
        jobtitle: "Web Developer Intern",
        where: "Divvia Payments",
        date: "April 2024 - July 2024",
        city: "Montreal, Quebec",
    },
    {
        jobtitle: "Sales Representative",
        where: "Harlow Payments",
        date: "January 2024 - April 2024",
        city: "Montreal, Quebec",
    },
    {
        jobtitle: "Data Entry Clerk",
        where: "PLANBONLINE Footwear Retailer",
        date: "September 2020 - August 2022",
        city: "Beirut, Lebanon",
    },
    {
        jobtitle: "Staff Writer",
        where: "TV Seventeen News Station",
        date: "October 2020 - August 2021",
        city: "Beirut, Lebanon",
    },
    {
        jobtitle: "Database Administrator",
        where: "Global ELT Solutions",
        date: "September 2020 - August 2021",
        city: "Beirut, Lebanon",
    },
];

const skills = [
    {
        name: "3D Modeling",
        value: 90,
    },
    {
        name: "React",
        value: 85,
    },
    {
        name: "Unity",
        value: 80,
    },
    {
        name: "Next.js",
        value: 60,
    },
    {
        name: "Tailwind CSS",
        value: 85,
    },
    {
        name: "ThreeJS",
        value: 80, // Add value as needed
    },
    {
        name: "Laravel",
        value: 75, // Add value as needed
    },
    {
        name: "JavaScript",
        value: 90, // Add value as needed
    },
    {
        name: "TypeScript",
        value: 70, // Add value as needed
    },
    {
        name: "HTML",
        value: 90, // Add value as needed
    },
    {
        name: "CSS",
        value: 85, // Add value as needed
    },
    {
        name: "PHP",
        value: 70, // Add value as needed
    },
    {
        name: "Vue.js",
        value: 65, // Add value as needed
    },
    {
        name: "Bootstrap",
        value: 70, // Add value as needed
    },
    {
        name: "Node.js",
        value: 75, // Add value as needed
    },
    {
        name: "Express.js",
        value: 70, // Add value as needed
    },
    {
        name: "RESTful APIs",
        value: 80, // Add value as needed
    },
    {
        name: "SQL",
        value: 75, // Add value as needed
    },
    {
        name: "MongoDB",
        value: 70, // Add value as needed
    },
    {
        name: "Git",
        value: 85, // Add value as needed
    },
    {
        name: "GitHub",
        value: 85, // Add value as needed
    },
    {
        name: "Docker",
        value: 70, // Add value as needed
    },
    {
        name: "AWS",
        value: 65, // Add value as needed
    },
    {
        name: "Netlify",
        value: 70, // Add value as needed
    },
    {
        name: "Vercel",
        value: 70, // Add value as needed
    },
    {
        name: "C#",
        value: 75, // Add value as needed
    },
    
];

const services = [{
        title: "Web Developer",
        description: "As a dedicated web developer with hands-on experience in a range of technologies, I am confident in my ability to contribute effectively to your team. My proficiency in both front-end and back-end development, including frameworks like React and NextJS, coupled with a solid understanding of deployment tools such as Docker and AWS, allows me to deliver robust and scalable solutions. My recent internship at Divvia Payments honed my skills in developing responsive web applications and optimizing performance, while my experience in client engagement and technical support further refined my problem-solving abilities. I bring a keen eye for detail and a commitment to creating user-friendly interfaces that enhance the overall user experience. With my diverse background and technical expertise, I am well-prepared to tackle complex web development challenges and drive successful project outcomes.",
    },

];

const dataportfolio = [{
        img: imgA,
        description: "A mock recreation of the Apple store page",
        link: "https://apple-site-two.vercel.app/",
    },
    {
        img: imgB,
        description: "Figma Clone I made",
        link: "https://figma-clone-main-nyxh.vercel.app/",
    },
    {
        img: imgC,
        description: "An anime library I made",
        link: "https://anime-vault-main-phi.vercel.app/",
    },

];

const contactConfig = {
    YOUR_EMAIL: "dalfeghali@gmail.com",
    
    description: "Feel free to contact me! ",
    // creat an emailjs.com account 
    // check out this tutorial https://www.emailjs.com/docs/examples/reactjs/
    YOUR_SERVICE_ID: "service_id",
    YOUR_TEMPLATE_ID: "template_id",
    YOUR_USER_ID: "user_id",
};

const socialprofils = {
    github: "https://github.com/SunnyDerwish",
    linkedin: "https://www.linkedin.com/in/david-feghali-444087256/",
    //twitter: "https://twitter.com",
};
export {
    meta,
    dataabout,
    dataportfolio,
    worktimeline,
    skills,
    services,
    introdata,
    contactConfig,
    socialprofils,
    logotext,
};