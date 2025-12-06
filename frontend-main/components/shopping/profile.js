export default function Profile(){
    return(
        <>
        <div className="container small-container mt-5">
  <h1 className="my-3">User Profile</h1>
  <form onsubmit="submitHandler(event)">
    <div className="mb-3">
      <label for="name" className="form-label">Name</label>
      <input type="text" className="form-control" id="name" placeholder="Enter your name" required/>
    </div>
    
    <div className="mb-3">
      <label for="email" className="form-label">Email</label>
      <input type="email" className="form-control" id="email" placeholder="Enter your email" required/>
    </div>
    
    <div className="mb-3">
      <label for="password" className="form-label">Password</label>
      <input type="password" className="form-control" id="password" placeholder="Enter a new password"/>
    </div>
    
    <div className="mb-3">
      <label for="confirmPassword" className="form-label">Confirm Password</label>
      <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm your password"/>
    </div>
    
    <div className="mb-3">
      <button type="submit" className="btn btn-primary" id="updateButton">Update</button>
      <div id="loadingBox" className="spinner-border text-primary ms-2" style={{display: "none;"}} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  </form>
</div>
        </>
    )
}