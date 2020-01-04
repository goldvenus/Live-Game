import { BackHandler } from 'react-native';

/**
 * Attaches an event listener that handles the android-only hardware
 * back button
 * @param  {Function} callback The function to call on click
 */
let m_backHandler = null;
const handleAndroidBackButton = (callback) => {
  m_backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
    callback();
    return true;
  });
};
/**
 * Removes the event listener in order not to add a new one
 * every time the view component re-mounts
 */
const removeAndroidBackButtonHandler = () => {
  if (m_backHandler) { m_backHandler.remove(); }
};
export { handleAndroidBackButton, removeAndroidBackButtonHandler };
