import { FaUser } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import { FaCar } from "react-icons/fa";
import { FaCarSide } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";
import { FaComment } from "react-icons/fa";

const iconMap = {
  FaUser: <FaUser />, 
  FaEnvelope: <FaEnvelope />, 
  FaPhone: <FaPhone />, 
  FaCar: <FaCar />, 
  FaCarSide: <FaCarSide />, 
  FaMapMarkerAlt: <FaMapMarkerAlt />, 
  FaCalendar: <FaCalendar />, 
  FaComment: <FaComment />
};

function IconField({icon}){
    return (
        <div>{iconMap[icon]}</div>
    )
  }

export default IconField;