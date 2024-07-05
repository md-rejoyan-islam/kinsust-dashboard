import React from "react";
import "./Style.scss";
import logo from "./img/kin_logo.jpg";
import ReactToPdf from "react-to-pdf";
import avatar from "./img/avatar.png";

const Download = () => {
  const ref = React.createRef();
  const options = {
    orientation: "landscape",
    unit: "px",
    format: [940, 1000],
  };

  return (
    <div className="main-div">
      <ReactToPdf targetRef={ref} filename="div-blue.pdf">
        {({ toPdf }) => (
          <button
            className="bg-violet-600 py-2 px-3 text0sm text-center rounded-md mb-3"
            onClick={toPdf}
          >
            Download
          </button>
        )}
      </ReactToPdf>

      <div className="center-hv mx-auto text-base" ref={ref}>
        <div className="container  text-sm">
          <div className="sec-1">
            <span>
              <span className="R">R</span>espond
            </span>
            <span>
              <span className="R">R</span>efund
            </span>
            <span>
              <span className="R">R</span>escue
            </span>
          </div>

          <div className=" justify-between flex items-center">
            <div className="center-hv">
              <img src={logo} alt="kin_logo" width="100px" />
            </div>

            <div className="text-center">
              <span className='text-[brown] font-bolder text-[4rem] font-["Arial_black"]'>
                KIN
              </span>{" "}
              <br />
              <span className="avo">A Voluntary Organization</span> <br />
              <span className="sust">
                Shahjalal University of Science and Technology, Sylhet
              </span>
            </div>

            <div className="center-hv">
              <form action="#">
                <label className="custom-file-input">
                  <input
                    type="file"
                    accept=".jpg, .jpeg, .png, .heic"
                    onchange="showImage(this)"
                  />
                  <img id="selected-image" src={avatar} alt="avatar" />
                </label>
              </form>
            </div>
          </div>

          <div className="flex justify-between">
            <span>Form No.: Online-001</span> <br />
            <span>Date: {new Date().toLocaleDateString()}</span>
          </div>
          <div className="py-2">
            <hr className="border-none h-[2px] bg-[#eee] " />
          </div>

          <div className="sec-4">
            <form action="submit_form.php" method="post">
              <div className="form-group items-center flex">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div className="flex  justify-between">
                <div className="flex flex-row items-center w-full">
                  <label for="father_name">Father's Name:</label>
                  <input
                    type="text"
                    id="father_name"
                    name="father_name"
                    required
                  />
                </div>
                <div className="w-full flex flex-row items-center">
                  <label for="mother_name">Mother's Name:</label>
                  <input
                    type="text"
                    id="mother_name"
                    name="mother_name"
                    required
                  />
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex items-center w-full">
                  <label for="dob">Date of Birth:</label>
                  {/* <input type="date" id="dob" name="dob" required /> */}
                  <p>12 June 2022</p>
                </div>
                <div className="flex items-center w-full">
                  <label for="blood_group">Blood Group:</label>
                  <p>B+</p>
                  {/* <input
                    type="text"
                    id="blood_group"
                    name="blood_group"
                    required
                  /> */}
                </div>
              </div>
              <div className="form-group">
                <label for="institution">Institution:</label>
                <input
                  type="text"
                  id="institution"
                  name="institution"
                  required
                />
              </div>
              <div className="flex items-center">
                <div className="w-full flex-0 flex flex-row items-center">
                  <label for="dept">Department:</label>
                  <input type="text" id="dept" name="dept" required />
                </div>
                <div className="flex flex-row items-center w-full">
                  <label for="session">Session:</label>
                  <input type="text" id="session" name="session" required />
                </div>
                <div className="flex flex-row items-center w-full">
                  <label for="reg_no">Registration No:</label>
                  <input type="text" id="reg_no" name="reg_no" required />
                </div>
              </div>
              <div className="form-group">
                <label for="home_district">Home District:</label>
                <input
                  type="text"
                  id="home_district"
                  name="home_district"
                  required
                />
              </div>
              <div className="form-group">
                <label for="address">Address:</label>
                <textarea
                  id="address"
                  name="address"
                  rows="4"
                  cols="50"
                  required
                ></textarea>
              </div>
              <h3>Contact Information</h3>
              <div className="form-group">
                <label for="phone">Phone :</label>
                <span className="p-[10px]">+88</span>
                <input type="text" id="phone" name="phone" required />
              </div>
              <div className="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required />
              </div>
              <label>THE ACTIVITIES OF KIN ARE INTERESTED IN</label>
              <div className="grid grid-cols-2">
                <div>
                  <input
                    type="checkbox"
                    id="activity1"
                    name="activity1"
                    value="#"
                  />
                  <label for="activity1">Blood Donation</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="activity2"
                    name="activity2"
                    value="#"
                  />
                  <label for="activity2">
                    Educational Program for Underprivileged Children
                  </label>{" "}
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="activity3"
                    name="activity3"
                    value="#"
                  />
                  <label for="activity3">Help Winter Affected People</label>{" "}
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="activity4"
                    name="activity4"
                    value="#"
                  />
                  <label for="activity4">Arranging Charity Programs</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="activity5"
                    name="activity5"
                    value="#"
                  />
                  <label for="activity5">Social Awareness Activities</label>{" "}
                </div>
              </div>
              {/* <div className="form-group">
                  <input
                    type="checkbox"
                    id="activity6"
                    name="activity6"
                    value="#"
                  />
                  <label for="activity6">Others</label>
                  <textarea
                    id="address"
                    name="address"
                    rows="4"
                    cols="50"
                  ></textarea>
                </div> */}
              <div className="m-[50px_0px_0px]">
                <input type="checkbox" id="#" name="#" value="#" />
                <label for="#">
                  I am swearing all the given information about me is true and I
                  shall be bound to all the decisions taken by <b>KIN</b>
                </label>{" "}
              </div>
            </form>
          </div>

          <div className="sec-5">
            <div className="text-center">
              <span className="name">Madhuryo Chakma</span>
              <hr />
              <span>President</span>
            </div>
            <div className="text-center">
              <span className="name">Syed Irfanul Huda</span>
              <hr />
              <span>General Secretary</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Download;
