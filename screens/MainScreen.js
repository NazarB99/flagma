/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-state */
/* eslint-disable global-require */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React from 'react'
import {Dimensions, TouchableWithoutFeedback} from 'react-native'
import {
  View,
  NavigationBar,
  GridRow,
  TextInput,
  Button,
  Image,
  ListView,
  Tile,
  TouchableOpacity,
  Card,
  Subtitle,
  ImageBackground,
  Divider,
  Text,
  Icon,
  Caption,
  Title,
} from '@shoutem/ui'
import {connect} from 'react-redux'
import {Overlay} from 'react-native-elements'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'

import Languages from '../config/Languages'
import {login, changeLocale} from '../actions/userActions'
import {setUnreadCount, addToCount} from '../actions/chatActions'
import {getAdsByCatId, setAd, setCategory, searchAdvs} from '../actions/adsActions'
import CategoryModal from '../components/CategoryModal'
import Loading from '../components/Loading'
import {MAIN_COLOR, ORANGE_COLOR} from '../config/Constants'
import {
  connectSocket,
  joinMe,
  clearSubscriptions,
  setUnreadCountSocket,
  messageAddOneCount,
  getUnreadCount,
} from '../config/Socket'
import LanguageOverlay from '../components/LanguagesOverlay'

class MainScreen extends React.Component {
  state = {
    loading: false,
    yAxis: 0,
    showButton: true,
    categoryModal: false,
    overlayVisible: false,
  }

  componentWillMount() {
    this.setState({loading: true})
  }

  componentDidMount() {
    // this.props.login('demortv22@gmail.com', 'demor')
    this.props.navigation.setParams({
      searchInputIsFocused: false,
      onFocus: () => this.props.navigation.setParams({searchInputIsFocused: true}),
      onBlur: () => this.props.navigation.setParams({searchInputIsFocused: false}),
      onType: () => this.props.navigation.setParams({searchInputIsFocused: false}),
      onSubmitEditing: text => {
        console.log(text)
        const data = {
          word: text,
          page: 1,
          per_page: 20,
        }
        this.props
          .searchAdvs(data)
          .then(() => this.props.navigation.navigate('AdListPage'))
          .catch(() => alert(Languages[this.props.user.locale].Loggedin))
      },
      changeLocale: () => this.setState({overlayVisible: true}),
    })
    const data = {
      id: 1,
      page: 1,
      per_page: 14,
    }
    this.props.getAdsByCatId(data).then(() => this.setState({loading: false}))
    if (this.props.ads.currencies.length > 0) {
      this.setState({loading: false})
    }
    if (this.props.user.user.id) {
      connectSocket(this.props.user.user.id)
      clearSubscriptions()
      joinMe(this.props.user.user.id)
      getUnreadCount(this.props.user.user.id)
      setUnreadCountSocket(count => this.props.setUnreadCount(count))
      messageAddOneCount(() => this.props.addToCount())
    }
  }

  getCurrency = id =>
    this.props.ads.currencies.length > 0
      ? this.props.ads.currencies.filter(item => item.id === id)[0].title
      : ''

  renderRow = (rowData, sectionId, index) => {
    const cellViews = rowData.map((ad, id) => {
      if (ad.images !== null) {
        console.log(ad.images[0].img_url)
      }
      return this.state.loading ? (
        <Loading />
      ) : (
        <TouchableOpacity
          key={id}
          styleName="flexible"
          onPress={() => {
            this.props.setAd(ad)
            this.props.navigation.navigate('Ad')
          }}>
          <Card styleName="flexible">
            <Image
              resizeMode="cover"
              styleName="medium-wide"
              style={{height: 200}}
              source={{uri: ad.images !== null ? ad.images[0].img_url : ''}}
            />
            <View styleName="content">
              <Subtitle numberOfLines={3}>{ad.name}</Subtitle>
              <Title>
                {`${ad.retail_price} `}
                {this.getCurrency(ad.currency_id) || 'TMT'}
                {Languages[this.props.user.locale].Item}
              </Title>
              <View styleName="horizontal">
                <Caption styleName="collapsible" numberOfLines={2}>
                  {ad.company_name}
                </Caption>
              </View>
            </View>
          </Card>
        </TouchableOpacity>
      )
    })

    return <GridRow columns={2}>{cellViews}</GridRow>
  }

  openCategoryModal = () => {
    this.setState({categoryModal: true})
  }

  closeCategoryModal = () => {
    this.setState({categoryModal: false})
  }

  setCategory = cat => {
    this.closeCategoryModal()
    this.props.setCategory(cat)
    this.props.navigation.navigate('AdListPage', {
      type: 'category',
    })
  }

  closeLanguageOverlay = () => {
    this.setState({overlayVisible: false})
  }

  openLanguageOverlay = () => {
    this.setState({overlayVisible: true})
  }

  render() {
    const {ads} = this.props.ads
    const groupedData = GridRow.groupByRows(ads, 2, () => 1)
    console.log(this.props.user)
    return (
      <View styleName="fill-parent">
        {this.state.loading ? (
          <Loading />
        ) : (
          <View
            onLayout={event => {
              console.log(event.nativeEvent.layout)
            }}>
            <LanguageOverlay
              navigation={this.props.navigation}
              locale={this.props.user.locale || 'ru'}
              changeLocale={this.props.changeLocale}
              closeLanguageOverlay={this.closeLanguageOverlay}
              openLanguageOverlay={this.openLanguageOverlay}
              overlayVisible={this.state.overlayVisible}
            />
            <ListView
              onScroll={({nativeEvent}) => {
                const y = this.state.yAxis
                this.setState({yAxis: nativeEvent.contentOffset.y}, () => {
                  console.log(y, nativeEvent.contentOffset.y)
                  if (
                    nativeEvent.contentOffset.y === 0 ||
                    y === 0 ||
                    (y > nativeEvent.contentOffset.y && y !== nativeEvent.contentOffset.y)
                  ) {
                    this.setState({showButton: true})
                  }
                  if (
                    nativeEvent.contentOffset.y !== 0 &&
                    y !== 0 &&
                    (y < nativeEvent.contentOffset.y || y === nativeEvent.contentOffset.y)
                  ) {
                    this.setState({showButton: false})
                  }
                })
              }}
              onEndReached={() => this.setState({showButton: false})}
              data={groupedData}
              renderRow={this.renderRow}
            />
          </View>
        )}
        <CategoryModal
          setCategory={this.setCategory}
          categories={this.props.ads.categories}
          isVisible={this.state.categoryModal}
          closeModal={this.closeCategoryModal}
        />
        {this.props.navigation.getParam('searchInputIsFocused') ? (
          <View
            style={{
              position: 'absolute',
              top: 10,
              left: Dimensions.get('window').width * 0.2,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Button
              onPress={this.openCategoryModal}
              style={{
                width: Dimensions.get('window').width * 0.6,
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderColor: '#999999',
                borderWidth: 0.7,
                borderRadius: 3,
                backgroundColor: '#f8f9fc',
              }}>
              <FontAwesome name="cubes" color="#4a97f1" size={28} />
              <Title style={{marginLeft: 10}}>
                {Languages[this.props.user.locale].Searchcategory}
              </Title>
            </Button>
            <Button
              onPress={() => this.props.navigation.navigate('Filter')}
              style={{
                width: Dimensions.get('window').width * 0.6,
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderColor: '#999999',
                borderWidth: 0.7,
                borderRadius: 3,
                backgroundColor: '#f8f9fc',
              }}>
              <FontAwesome name="filter" color="#4a97f1" size={28} />
              <Title style={{marginLeft: 10}}>{Languages[this.props.user.locale].Filterads}</Title>
            </Button>
          </View>
        ) : null}
        {this.state.showButton ? (
          <View style={{position: 'absolute', bottom: 10, alignSelf: 'center'}}>
            <Button
              style={{
                backgroundColor: ORANGE_COLOR,
                borderColor: 'white',
                borderWidth: 0.8,
                padding: 10,
                borderRadius: 10,
              }}
              onPress={() =>
                this.props.user.user.id
                  ? this.props.navigation.navigate('AddAdv')
                  : alert(Languages[this.props.user.locale].Loggedin)
              }>
              <Icon name="plus-button" style={{color: 'white'}} />
              <Text style={{color: 'white'}}>
                {Languages[this.props.user.locale].Addadvertisement}
              </Text>
            </Button>
          </View>
        ) : null}
      </View>
    )
  }
}

const mapStateToProps = state => ({
  ads: state.ads,
  user: state.user,
})

export default connect(
  mapStateToProps,
  {getAdsByCatId, setAd, setCategory, searchAdvs, login, setUnreadCount, addToCount, changeLocale}
)(MainScreen)
