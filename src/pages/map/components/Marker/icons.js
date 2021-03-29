// Ant Design Icons
import { AiTwotoneExperiment } from 'react-icons/ai'

// Box Icons
import { BiBuildingHouse, BiMapPin } from 'react-icons/bi'

// Font Awesome
import {
  FaCircle,
  FaChurch,
  FaMonument,
  FaRoad,
  FaTree,
  FaSynagogue,
  FaSubway,
  FaUniversity,
  FaTrain,
  FaLandmark,
  FaMusic,
  FaPiggyBank,
  FaBuilding,
} from 'react-icons/fa'

// Game Icons
import {
  GiCastle,
  GiChurch,
  GiCoffin,
  GiFamilyHouse,
  GiStoneBridge,
  GiSwordsEmblem,
  GiVillage,
} from 'react-icons/gi'

// Github Octicons
import { GoRadioTower } from 'react-icons/go'

// IcoMoon
import { ImPower } from 'react-icons/im'

// Simple Icons
import { SiInternetarchive } from 'react-icons/si'

/**
 * Default icon, displayed when there was no matching icon found
 */
const defaultIcon = <FaCircle />

/**
 * All the available icons
 */
const icons = {
  architectural: <SiInternetarchive />,
  bank: <FaPiggyBank />,
  battle: <GiSwordsEmblem />,
  bridge: <GiStoneBridge />,
  castle: <GiCastle />,
  cathedral: <GiChurch />,
  cemetery: <GiCoffin />,
  church: <FaChurch />,
  default: defaultIcon,
  department: <FaBuilding />,
  district: <BiMapPin />,
  metro: <FaSubway />,
  monument: <FaMonument />,
  museum: <FaLandmark />,
  neighborhood: <BiBuildingHouse />,
  neighbourhood: <BiBuildingHouse />,
  palace: <GiFamilyHouse />,
  park: <FaTree />,
  'power station': <ImPower />,
  railway: <FaTrain />,
  'radio station': <GoRadioTower />,
  'record label': <FaMusic />,
  research: <AiTwotoneExperiment />,
  residence: <GiFamilyHouse />,
  street: <FaRoad />,
  synagogue: <FaSynagogue />,
  university: <FaUniversity />,
  village: <GiVillage />,
}

export default icons
