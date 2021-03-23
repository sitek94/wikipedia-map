import icons from './icons'

const availableIconNames = Object.keys(icons)

const re = new RegExp(availableIconNames.join('|'), 'i')

/**
 * It tries to find a matching icon in the given string.
 *
 * If there is a keyword that will match one of the available icons it will
 * return a corresponding icon, otherwise it will return a default icon.
 *
 * @param {String} string a string to check for a matching icon
 * @returns {JSX.Element} matching or default icon
 */
export default function getIconFromString(string) {
  const match = string.match(re)

  const iconName = match ? match[0].toLowerCase() : 'default'

  return icons[iconName]
}
