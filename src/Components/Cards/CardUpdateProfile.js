
import React, { useState, useMemo } from "react";
import { Dispatch } from "redux";
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../reducer/loginSlice'
import { AxiosResponse, AxiosError } from "axios";
import axios from "axios";
import { AuthLiveApis } from "../../apis/live/authLiveApis";
import { AuthApis } from "../../apis/authApis";
import { store } from "../../store/store";
import { History } from "history";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../Navbars/Navbar";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import Modal from 'react-awesome-modal';
import { PhoneInput } from "react-contact-number-input";
import { SvgElement, icontypesEnum } from "../assets/svgElement";
import { AdminApis } from "../../apis/adminApi";
import { FaTrash, FaEdit } from "react-icons/fa";
import { AiOutlineWarning } from "react-icons/ai";
import { ReactCountryDropdown } from 'react-country-dropdown'
import 'react-country-dropdown/dist/index.css'
import Select from 'react-select'
import countryList from 'react-select-country-list'



// components



export default function CardCreateLink() {
  const navigate = useNavigate();


  let [visible, setVisible] = React.useState(false);
  let [value, setvalue] = React.useState(false);

  function toggleModal() {
    setVisible(!visible)
  }

  let [toggle, setToggle] = React.useState(false);
  function togglePasswordModal() {
    setToggle(!toggle)
  }

  function toggleCloseModal() {
    setVisible(!visible)
    navigate('/mylinks');
  }

  function isCopied() {
    toast.success("Copied to Clipard");
  }
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState('');
  const [slicedLink, setSlicedLink] = useState('');
  const [data, setData] = useState('');
  const [accounttype, setAccounttype] = useState('');
  const [businessCategory, setBusinessCategory] = useState('');
  const [country, setCountry] = useState('');

  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');



  // How to access the redux store
  const userLoginData = useSelector((state) => state.data.login.value);

  // This is used to update the store
  const dispatch = useDispatch();

  const options = useMemo(() => countryList().getData(), [])

  const changeHandler = value => {
    console.log(value?.label)
    setCountry(value)
  }
console.log(country);
  const handleSubmit = React.useCallback(
    (e) => {
      e.preventDefault();
      const formData = new FormData()

      // formData.append('phone_number', (phone?.countryCode + phone?.phoneNumber))
      formData.append('name', name)
      formData.append('phone_number', phoneNumber)
      formData.append('account_type', accounttype)
      formData.append('business_category', businessCategory)
      formData.append('country', country)
      formData.append('email', email)

      AdminApis.updateProfile(formData).then(
        (response) => {
          if (response?.data) {
            toast.success(response?.data?.message);
          }

        }
      ).catch(function (error) {
        toast.error("Please, update all fields");
      })
    },
    [email, name, phoneNumber, businessCategory, accounttype, country]
  );



  const updatePassword = React.useCallback(
    (e) => {
      e.preventDefault();
      const formData = new FormData()

      // formData.append('phone_number', (phone?.countryCode + phone?.phoneNumber))
      formData.append('old_password', oldPassword)
      formData.append('password', password)
      formData.append('password_confirmation', passwordConfirmation)
      AdminApis.updatePassword(formData).then(
        (response) => {
          if (response?.data) {
            console.log(response?.data)
            toast.success(response?.data?.message);
          }

        }
      ).catch(function (error) {
        toast.error("Some error occurred");
      })
    },
    [oldPassword, password, passwordConfirmation]
  );




  return (
    <>

      <div className="pb-32 sm:px-10">
        <div className="container  p-6">

          <form className="pb-10" onSubmit={handleSubmit}>
            <div class="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 ">Business/Brand Name</label>
                <input type="text" name="name" id="first_name" onChange={(e) => setName(e?.target?.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Name" />
              </div>
              <div>
                <label class="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                <input type="email" name="email" id="last_name" onChange={(e) => setEmail(e?.target?.value)} value={store.getState().data.login.value.email} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Email" />
              </div>
              <div>
                <label for="company" class="block mb-2 text-sm font-medium text-gray-900 ">Phone</label>
                <input type="text" onChange={(e) => setPhoneNumber(e?.target?.value)} id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Phone" />
              </div>
              <div>
                <label for="countries" class="block mb-2 text-sm font-medium text-gray-900">Account Type</label>
                <select onChange={(e) => setAccounttype(e?.target?.value)} id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                  <option selected value="business">Business</option>
                  <option value="personal">Personal</option>

                </select>
              </div>
              <div>
                <label for="countries" class="block mb-2 text-sm font-medium text-gray-900">Country</label>
                {/* <Select options={options} value={country} onChange={changeHandler} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" /> */}

                <select onChange={(e) => setCountry(e?.target?.value)} id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                  <option value="Nigeria">Nigeria</option>
                  <option value="Afghanistan">Afghanistan</option>
                  <option value="Aland Islands">Aland Islands</option>
                  <option value="Albania">Albania</option>
                  <option value="Algeria">Algeria</option>
                  <option value="American Samoa">American Samoa</option>
                  <option value="Andorra">Andorra</option>
                  <option value="Angola">Angola</option>
                  <option value="Anguilla">Anguilla</option>
                  <option value="Antarctica">Antarctica</option>
                  <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                  <option value="Argentina">Argentina</option>
                  <option value="Armenia">Armenia</option>
                  <option value="Aruba">Aruba</option>
                  <option value="Australia">Australia</option>
                  <option value="Austria">Austria</option>
                  <option value="Azerbaijan">Azerbaijan</option>
                  <option value="Bahamas">Bahamas</option>
                  <option value="Bahrain">Bahrain</option>
                  <option value="Bangladesh">Bangladesh</option>
                  <option value="Barbados">Barbados</option>
                  <option value="Belarus">Belarus</option>
                  <option value="Belgium">Belgium</option>
                  <option value="Belize">Belize</option>
                  <option value="Benin">Benin</option>
                  <option value="Bermuda">Bermuda</option>
                  <option value="Bhutan">Bhutan</option>
                  <option value="Bolivia">Bolivia</option>
                  <option value="Bonaire, Sint Eustatius and Saba">Bonaire, Sint Eustatius and Saba</option>
                  <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                  <option value="Botswana">Botswana</option>
                  <option value="Bouvet Island">Bouvet Island</option>
                  <option value="Brazil">Brazil</option>
                  <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                  <option value="Brunei Darussalam">Brunei Darussalam</option>
                  <option value="Bulgaria">Bulgaria</option>
                  <option value="Burkina Faso">Burkina Faso</option>
                  <option value="Burundi">Burundi</option>
                  <option value="Cambodia">Cambodia</option>
                  <option value="Cameroon">Cameroon</option>
                  <option value="Canada">Canada</option>
                  <option value="Cape Verde">Cape Verde</option>
                  <option value="Cayman Islands">Cayman Islands</option>
                  <option value="Central African Republic">Central African Republic</option>
                  <option value="Chad">Chad</option>
                  <option value="Chile">Chile</option>
                  <option value="China">China</option>
                  <option value="Christmas Island">Christmas Island</option>
                  <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
                  <option value="Colombia">Colombia</option>
                  <option value="Comoros">Comoros</option>
                  <option value="Congo">Congo</option>
                  <option value="Congo, Democratic Republic of the Congo">Congo, Democratic Republic of the Congo</option>
                  <option value="Cook Islands">Cook Islands</option>
                  <option value="Costa Rica">Costa Rica</option>
                  <option value="Cote D'Ivoire">Cote D'Ivoire</option>
                  <option value="Croatia">Croatia</option>
                  <option value="Cuba">Cuba</option>
                  <option value="Curacao">Curacao</option>
                  <option value="Cyprus">Cyprus</option>
                  <option value="Czech Republic">Czech Republic</option>
                  <option value="Denmark">Denmark</option>
                  <option value="Djibouti">Djibouti</option>
                  <option value="Dominica">Dominica</option>
                  <option value="Dominican Republic">Dominican Republic</option>
                  <option value="Ecuador">Ecuador</option>
                  <option value="Egypt">Egypt</option>
                  <option value="El Salvador">El Salvador</option>
                  <option value="Equatorial Guinea">Equatorial Guinea</option>
                  <option value="Eritrea">Eritrea</option>
                  <option value="Estonia">Estonia</option>
                  <option value="Ethiopia">Ethiopia</option>
                  <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
                  <option value="Faroe Islands">Faroe Islands</option>
                  <option value="Fiji">Fiji</option>
                  <option value="Finland">Finland</option>
                  <option value="France">France</option>
                  <option value="French Guiana">French Guiana</option>
                  <option value="French Polynesia">French Polynesia</option>
                  <option value="French Southern Territories">French Southern Territories</option>
                  <option value="Gabon">Gabon</option>
                  <option value="Gambia">Gambia</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Germany">Germany</option>
                  <option value="Ghana">Ghana</option>
                  <option value="Gibraltar">Gibraltar</option>
                  <option value="Greece">Greece</option>
                  <option value="Greenland">Greenland</option>
                  <option value="Grenada">Grenada</option>
                  <option value="Guadeloupe">Guadeloupe</option>
                  <option value="Guam">Guam</option>
                  <option value="Guatemala">Guatemala</option>
                  <option value="Guernsey">Guernsey</option>
                  <option value="Guinea">Guinea</option>
                  <option value="Guinea-Bissau">Guinea-Bissau</option>
                  <option value="Guyana">Guyana</option>
                  <option value="Haiti">Haiti</option>
                  <option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option>
                  <option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
                  <option value="Honduras">Honduras</option>
                  <option value="Hong Kong">Hong Kong</option>
                  <option value="Hungary">Hungary</option>
                  <option value="Iceland">Iceland</option>
                  <option value="India">India</option>
                  <option value="Indonesia">Indonesia</option>
                  <option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
                  <option value="Iraq">Iraq</option>
                  <option value="Ireland">Ireland</option>
                  <option value="Isle of Man">Isle of Man</option>
                  <option value="Israel">Israel</option>
                  <option value="Italy">Italy</option>
                  <option value="Jamaica">Jamaica</option>
                  <option value="Japan">Japan</option>
                  <option value="Jersey">Jersey</option>
                  <option value="Jordan">Jordan</option>
                  <option value="Kazakhstan">Kazakhstan</option>
                  <option value="Kenya">Kenya</option>
                  <option value="Kiribati">Kiribati</option>
                  <option value="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</option>
                  <option value="Korea, Republic of">Korea, Republic of</option>
                  <option value="Kosovo">Kosovo</option>
                  <option value="Kuwait">Kuwait</option>
                  <option value="Kyrgyzstan">Kyrgyzstan</option>
                  <option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
                  <option value="Latvia">Latvia</option>
                  <option value="Lebanon">Lebanon</option>
                  <option value="Lesotho">Lesotho</option>
                  <option value="Liberia">Liberia</option>
                  <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                  <option value="Liechtenstein">Liechtenstein</option>
                  <option value="Lithuania">Lithuania</option>
                  <option value="Luxembourg">Luxembourg</option>
                  <option value="Macao">Macao</option>
                  <option value="Macedonia, the Former Yugoslav Republic of">Macedonia, the Former Yugoslav Republic of</option>
                  <option value="Madagascar">Madagascar</option>
                  <option value="Malawi">Malawi</option>
                  <option value="Malaysia">Malaysia</option>
                  <option value="Maldives">Maldives</option>
                  <option value="Mali">Mali</option>
                  <option value="Malta">Malta</option>
                  <option value="Marshall Islands">Marshall Islands</option>
                  <option value="Martinique">Martinique</option>
                  <option value="Mauritania">Mauritania</option>
                  <option value="Mauritius">Mauritius</option>
                  <option value="Mayotte">Mayotte</option>
                  <option value="Mexico">Mexico</option>
                  <option value="Micronesia, Federated States of">Micronesia, Federated States of</option>
                  <option value="Moldova, Republic of">Moldova, Republic of</option>
                  <option value="Monaco">Monaco</option>
                  <option value="Mongolia">Mongolia</option>
                  <option value="Montenegro">Montenegro</option>
                  <option value="Montserrat">Montserrat</option>
                  <option value="Morocco">Morocco</option>
                  <option value="Mozambique">Mozambique</option>
                  <option value="Myanmar">Myanmar</option>
                  <option value="Namibia">Namibia</option>
                  <option value="Nauru">Nauru</option>
                  <option value="Nepal">Nepal</option>
                  <option value="Netherlands">Netherlands</option>
                  <option value="Netherlands Antilles">Netherlands Antilles</option>
                  <option value="New Caledonia">New Caledonia</option>
                  <option value="New Zealand">New Zealand</option>
                  <option value="Nicaragua">Nicaragua</option>
                  <option value="Niger">Niger</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="Niue">Niue</option>
                  <option value="Norfolk Island">Norfolk Island</option>
                  <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                  <option value="Norway">Norway</option>
                  <option value="Oman">Oman</option>
                  <option value="Pakistan">Pakistan</option>
                  <option value="Palau">Palau</option>
                  <option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>
                  <option value="Panama">Panama</option>
                  <option value="Papua New Guinea">Papua New Guinea</option>
                  <option value="Paraguay">Paraguay</option>
                  <option value="Peru">Peru</option>
                  <option value="Philippines">Philippines</option>
                  <option value="Pitcairn">Pitcairn</option>
                  <option value="Poland">Poland</option>
                  <option value="Portugal">Portugal</option>
                  <option value="Puerto Rico">Puerto Rico</option>
                  <option value="Qatar">Qatar</option>
                  <option value="Reunion">Reunion</option>
                  <option value="Romania">Romania</option>
                  <option value="Russian Federation">Russian Federation</option>
                  <option value="Rwanda">Rwanda</option>
                  <option value="Saint Barthelemy">Saint Barthelemy</option>
                  <option value="Saint Helena">Saint Helena</option>
                  <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                  <option value="Saint Lucia">Saint Lucia</option>
                  <option value="Saint Martin">Saint Martin</option>
                  <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
                  <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
                  <option value="Samoa">Samoa</option>
                  <option value="San Marino">San Marino</option>
                  <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                  <option value="Saudi Arabia">Saudi Arabia</option>
                  <option value="Senegal">Senegal</option>
                  <option value="Serbia">Serbia</option>
                  <option value="Serbia and Montenegro">Serbia and Montenegro</option>
                  <option value="Seychelles">Seychelles</option>
                  <option value="Sierra Leone">Sierra Leone</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Sint Maarten">Sint Maarten</option>
                  <option value="Slovakia">Slovakia</option>
                  <option value="Slovenia">Slovenia</option>
                  <option value="Solomon Islands">Solomon Islands</option>
                  <option value="Somalia">Somalia</option>
                  <option value="South Africa">South Africa</option>
                  <option value="South Georgia and the South Sandwich Islands">South Georgia and the South Sandwich Islands</option>
                  <option value="South Sudan">South Sudan</option>
                  <option value="Spain">Spain</option>
                  <option value="Sri Lanka">Sri Lanka</option>
                  <option value="Sudan">Sudan</option>
                  <option value="Suriname">Suriname</option>
                  <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
                  <option value="Swaziland">Swaziland</option>
                  <option value="Sweden">Sweden</option>
                  <option value="Switzerland">Switzerland</option>
                  <option value="Syrian Arab Republic">Syrian Arab Republic</option>
                  <option value="Taiwan, Province of China">Taiwan, Province of China</option>
                  <option value="Tajikistan">Tajikistan</option>
                  <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
                  <option value="Thailand">Thailand</option>
                  <option value="Timor-Leste">Timor-Leste</option>
                  <option value="Togo">Togo</option>
                  <option value="Tokelau">Tokelau</option>
                  <option value="Tonga">Tonga</option>
                  <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                  <option value="Tunisia">Tunisia</option>
                  <option value="Turkey">Turkey</option>
                  <option value="Turkmenistan">Turkmenistan</option>
                  <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
                  <option value="Tuvalu">Tuvalu</option>
                  <option value="Uganda">Uganda</option>
                  <option value="Ukraine">Ukraine</option>
                  <option value="United Arab Emirates">United Arab Emirates</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="United States">United States</option>
                  <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                  <option value="Uruguay">Uruguay</option>
                  <option value="Uzbekistan">Uzbekistan</option>
                  <option value="Vanuatu">Vanuatu</option>
                  <option value="Venezuela">Venezuela</option>
                  <option value="Viet Nam">Viet Nam</option>
                  <option value="Virgin Islands, British">Virgin Islands, British</option>
                  <option value="Virgin Islands, U.s.">Virgin Islands, U.s.</option>
                  <option value="Wallis and Futuna">Wallis and Futuna</option>
                  <option value="Western Sahara">Western Sahara</option>
                  <option value="Yemen">Yemen</option>
                  <option value="Zambia">Zambia</option>
                  <option value="Zimbabwe">Zimbabwe</option>
                </select>
              </div>
              {/* <div>
                <label for="countries" class="block mb-2 text-sm font-medium text-gray-900">Business category</label>
                <select onChange={(e) => setBusinessCategory(e?.target?.value)} id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                  <option selected>technology</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="FR">France</option>
                  <option value="DE">Germany</option>
                </select>
              </div> */}


            </div>
            <span className="md:flex md:justify-start gap-2">
              <button
                type="submit"
                style={{ backgroundColor: '#61A24F', borderRadius: '50px' }}
                className="text-sm w-full sm:w-auto px-10 py-2.5 text-center text-white hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg  "
              >
                Update
              </button>

              {/* <p className=" text-gray-500 flex justify-center pt-3 text-xs font-xs cursor-pointer" onClick={toggleModal}>Cancel</p> */}

            </span>
            {/* <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button> */}
          </form>



          <form onSubmit={updatePassword}>
            <span className="flex gap-3 pb-5 cursor-pointer" onClick={togglePasswordModal}>
              <label for="email" class="block mb-2 text-sm text-gray-900">Change Password </label>
              <span><SvgElement type={icontypesEnum.ARROWUP} /></span>
            </span>

            <div className={toggle ? '' : 'hidden'}>
              <div className="grid gap-6 mb-2 md:grid-cols-2">
                <div class="mb-6">
                  <label for="password" class="block mb-2 text-sm text-gray-500 font-bold">Current Password</label>
                  <input onChange={(e) => setOldPassword(e?.target?.value)} type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="•••••••••" required="" />
                </div>
              </div>

              <div className="grid gap-6 mb-2 md:grid-cols-2">
                <div class="mb-6">
                  <label for="password" class="block mb-2 text-sm font-bold text-gray-500 ">New Password</label>
                  <input onChange={(e) => setPassword(e?.target?.value)} type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="•••••••••" required="" />
                </div>
              </div>

              <div className="grid gap-6 mb-2 md:grid-cols-2">
                <div class="mb-6">
                  <label for="password" class="block mb-2 text-sm font-bold text-gray-500 ">Confirm Password</label>
                  <input onChange={(e) => setPasswordConfirmation(e?.target?.value)} type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="•••••••••" required="" />
                </div>
              </div>

              <button
                type="submit"
                style={{ backgroundColor: '#61A24F', borderRadius: '50px' }}
                className="text-sm w-full sm:w-auto px-10 py-2.5 text-center text-white hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg  "
              >
                Update
              </button>
            </div>
          </form>



        </div>

      </div>

      {/* <Doughnut data={...} /> */}



      <section>
        <Modal
          visible={visible}
          width="400"
          height="300"
          effect="fadeInUp"
          onClickAway={() => toggleModal}
        >


          <div className=" " style={{ height: '100%', overflow: 'auto' }}>
            <div className="container flex flex-row justify-center bg-[#fff] mx-auto items-center rounded-lg p-4">

              <div className=" ">
                <div className=" ">


                </div>

                <div className="mt-2">
                  <form className="pb-4 rounded-lg p-4">
                    <span className="flex justify-between">
                      <h1 className=" text-xs text-black font-bold" style={{ fontSize: '15px' }}>Congratulations</h1>
                      <p className="cursor-pointer font-bold" onClick={toggleModal}>X</p>
                    </span>

                    <label
                      className="flex justify-start block mb-2 pt-2 text-xs font-bold text-black"
                    >
                      You are the owner of wa.uforo.link/{slicedLink}
                    </label>

                    <label
                      className="flex justify-start block mb-2 pt-2 text-xs font-medium text-gray-600"
                    >
                      There are 2 links in your plan, you have already use 1, you can create 1 additional link
                    </label>

                    <span className="flex justify-center pt-4">
                      <button
                        type="button"
                        o
                        style={{ backgroundColor: '#61A24F', borderRadius: '50px' }}
                        className=" text-white hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full px-2 py-2.5 text-center "
                      >
                        Confirm
                      </button>
                    </span>

                    <p className="flex justify-center text-gray-500 pt-3 text-xs font-xs cursor-pointer" onClick={toggleModal}>Cancel</p>


                  </form>

                </div>
              </div>
            </div>

          </div>
        </Modal>
      </section>

      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />
    </>
  );
}
