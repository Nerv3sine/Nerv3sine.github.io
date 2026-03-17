import { projData } from './dataLoading'

import snapshotBG from '../../Website/img_files/pure bg.webp'
import snapshot from '../../Website/img_files/bg contents.webp'

import ShowcaseCard from './components/showcaseCard'

import './App.css'
import { useEffect, useState } from 'react'

function App() {

  const [projectData, updateProjects] = useState<projData[]>([]);

  useEffect(() => {
    fetch('https://nerv3sine.github.io/Website/ContentShowcase.json')
      .then(resp => {
        if(!resp.ok){
          throw new Error(`Error loading project data`);
        }
        return resp.json();
      }).then(data => {
        updateProjects(data['content'])
        // return data['content']
      }).then(d => {
        // console.log(projectData)
      })
  }, [])

  return (
    <>
      <img src={snapshotBG} alt="siteBG" className="mainPageBG"/>
      <img src={snapshot} alt="siteFG" className="bannerContent"/>
      <div id="pageBody">
        <h1>Dev Work</h1>
        <div id="gallery">
        {
          projectData.map((proj:projData) => {
            return <ShowcaseCard data={proj}/>
          })
        }
          {/* <ShowcaseCard snapshotLink={"https://nerv3sine.github.io/Website/StrataArcade/StrataArcade.png"} cardName={"Test"} subtext={"test"} buttonLinks={["google.ca"]}/> */}
        </div>
      </div>
    </>
  )
}

export default App
