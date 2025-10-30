import React from 'react'

const Footer = () => {
  return (
    <div>
    <div className='p-4 bg-dark'>
      <footer class="d-flex flex-wrap justify-content-between align-items-center py-5 my-5 " style={{height:"18vh",borderTop:"2px solid white"}}> 
        <div class="col-md-4 d-flex align-items-center">
             <a href='#' style={{textDecoration:"none"}}>
                <span style={{backgroundColor:"white",borderRadius:"50%",color:"black",padding:"10px 15px 10px 15px",margin:"0px 10px 0px 10px",fontWeight:"bold",fontSize:"1.2rem"}}>𝚄</span>
             </a>
            <span class="mb-3 mb-md-0 text-white">© 2025 Company, Inc</span> 
            </div> 
            <ul class="nav col-md-4 justify-content-end list-unstyled d-flex"> 
                <li class="ms-3">
                    <a class="text-body-secondary" href="https://www.instagram.com/_asit.0.__?igsh=ZXgwaDVxZmNnMnNx" aria-label="Instagram" target='_blank'>
                        <img src='instagram.png' alt='instalogo'
                        style={{height:"35px"}} />
                    </a>
                </li> 
                <li class="ms-3">
                    <a class="text-body-secondary" href="https://www.linkedin.com/in/ayush-tanty-370370321" aria-label="LinkedIn" target='_blank'>
                        <img src='linkedin.png' alt='instalogo'
                        style={{height:"35px"}} />
                    </a>
                </li> 
            </ul>
        </footer>
    </div>
    <div style={{height:"5vh",backgroundColor:"white"}}>
        </div>
    </div>
  )
}

export default Footer
