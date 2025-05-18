import React from 'react'
import '../styles/OverView.css'
const OverView = () => {
  return (
    <div className="OverView-Container">
            <div className="File-Overview">

                <div className="img"></div>
              
            </div>
            <div className="Tools">
<div className="icons"><i class='bx bxs-share bx-flip-horizontal' ></i></div>
<div className="icons"><i class='bx bxs-share bx-flip-horizontal' ></i></div>
<div className="icons"><i class='bx bxs-share bx-flip-horizontal' ></i></div>
<div className="icons"><i class='bx bxs-share bx-flip-horizontal' ></i></div>
<div className="icons"><i class='bx bxs-share bx-flip-horizontal' ></i></div>

            </div>

<div className="File-Desciption">

    <div className="Name-Type">

        <h2>Mountain Image</h2>
        <h4>JPEG</h4>
    </div>
    <div className="Description-Box">
        <h4>Description</h4>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum pariatur quidem, officia in porro veritatis exercitationem sapiente soluta odit, culpa illo molestiae, dicta optio? Fugiat quo</p>
    </div>
    <div className="Info">
        <div className="Size"><h2></h2> <span></span></div>
        <div className="Date">Date:</div>
    </div>
</div>

    </div>
  )
}

export default OverView