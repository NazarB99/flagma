/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
import {NavigationActions, DrawerActions} from 'react-navigation'

let _navigator

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  )
}

function openDrawer() {
  _navigator.dispatch(DrawerActions.openDrawer())
}

function closeDrawer() {
  _navigator.dispatch(DrawerActions.closeDrawer())
}

function goBack() {
  _navigator.dispatch(NavigationActions.back())
}

// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator,
  openDrawer,
  closeDrawer,
  goBack,
}
