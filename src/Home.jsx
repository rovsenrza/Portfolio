import React from 'react'
import handshake from "../public/img/handshake.png"
import rovsanlogo from "../public/img/rovshan_logo.webp"
import ascalini from "../public/img/ascalini.png"
import afgen from "../public/img/afgen-new.png"

import ertok from "../public/img/ertok.png"
import azdizayn from "../public/img/azdizayn.png"
import amazon from "../public/img/amazon.png"
import siren from "../public/img/siren.png"
import azeturizm from "../public/img/azeturizm.png"
import integro from "../public/img/integro.png"
import labor from "../public/img/labor.png"
import logo from "../public/img/Black Simple Personal Logo.png"
function Home() {
  return (
    <main>
        <div className="banner">
          <div className="container ">
          <div className="banner_inner">
            <div className="all_banner">
            <div className="banner_img"><img src={rovsanlogo} alt="logo" width={"100%"}/></div>
            <p>Hi I'm Rovshan Rzayev <img src={handshake} width="20px" alt="dasdas" /></p>
            <h1>Crafting seamless <br /> web experiences with <br /> code.</h1>
            <a href="https://wa.me/+994507193149">Contact with me</a>
          </div>
          </div>
          </div>
        </div>
        <section className="about">
         <div className="container">
            <div className="about_inner">
            <div className="about_content">
            <h3>About me</h3>
            <p>I'm Rovsan Rzayev, a frontend developer with over two years of experience in the industry. I specialize in creating engaging, user-friendly web applications using the latest technologies and frameworks. My expertise spans HTML, CSS, JavaScript and React, allowing me to turn complex design ideas into functional, visually appealing interfaces. I pride myself on staying current with the latest trends and tools, which helps me deliver innovative and effective solutions. My goal is to craft seamless user experiences and high-quality results, ensuring that every project meets the demands of modern web standards.</p>
            <p>For Resume: <a href="https://drive.google.com/file/d/1ykdgs3l8nPv44kMPaLmt3WPvKPPS62Zd/view?usp=sharing">click here</a></p>            
            </div>
            <div className="about_img"><img src={logo} alt="dasdas" /></div>
            </div>
         </div>
        </section>
        <section className="projects">
          <div className="container">
            <h3>Projects</h3>
            <div className="project_inner">
              <div className="project_card">
              <div className="project_img">
              <img src={ascalini} alt="ascalini" />
              </div>
              <h4>Ascalini</h4>
              </div>
              <div className="project_card">
              <div className="project_img">
              <img src={afgen} alt="ascalini" />
              </div>
              <h4>Afgen GDM</h4>
              </div>
              <div className="project_card">
              <div className="project_img">
              <img src={ertok} alt="ascalini" />
              </div>
              <h4>Ertok LLC</h4>
              </div>
              <div className="project_card">
              <div className="project_img">
              <img src={azdizayn} alt="ascalini" />
              </div>
              <h4>Azdizayn LLC</h4>
              </div>
              <div className="project_card">
              <div className="project_img">
              <img src={amazon} alt="ascalini" />
              </div>
              <h4>Amazon Travel</h4>
              </div>
              <div className="project_card">
              <div className="project_img">
              <img src={siren} alt="ascalini" />
              </div>
              <h4>Siren Trading LLC</h4>
              </div>
              <div className="project_card">
              <div className="project_img">
              <img src={azeturizm} alt="ascalini" />
              </div>
              <h4>Azeturizm</h4>
              </div>
              <div className="project_card">
              <div className="project_img">
              <img src={integro} alt="ascalini" />
              </div>
              <h4>Integro Group LLC</h4>
              </div>
              <div className="project_card">
              <div className="project_img">
              <img src={labor} alt="ascalini" />
              </div>
              <h4>Labor LLC</h4>
              </div>
            </div>
            
          </div>
        </section>
    </main>
  )
}

export default Home
