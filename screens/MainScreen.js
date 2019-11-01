/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-state */
/* eslint-disable global-require */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React from 'react'
import {Dimensions} from 'react-native'
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
import Hamburger from 'react-native-animated-hamburger'

import {getAdsByCatId, setAd} from '../actions/adsActions'
import Navbar from '../components/Navbar'
import Loading from '../components/Loading'
import {MAIN_COLOR, ORANGE_COLOR} from '../config/Constants'

class MainScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerStyle: {backgroundColor: MAIN_COLOR},
      headerLeft: (
        <Hamburger
          type="cross"
          active={false}
          color="white"
          onPress={() => {
            if (true) {
              navigation.openDrawer()
              // setDrawerStatus(true)
            } else {
              navigation.closeDrawer()
              // setDrawerStatus(false)
            }
          }}
          underlayColor="transparent"
        />
      ),
      headerTitle: (
        <TextInput
          placeholder="Search Flagma"
          style={{
            backgroundColor: '#f5f5f5',
            width: Dimensions.get('window').width * 0.65,
            height: 40,
            padding: 5,
            borderRadius: 5,
            marginBottom: 3,
          }}
        />
      ),
      headerRight: (
        <Button style={{height: 30, width: 30, marginRight: 10, padding: 0}}>
          <Image
            style={{height: 30, width: 30}}
            source={require('../assets/images/united-kingdom.png')}
          />
        </Button>
      ),
      // ) : (
      //   <Button onPress={() => navigation.goBack()}>
      //     <Icon size={26} color="white" name="arrow-left" />
      //   </Button>
      // ),
    }
  }

  state = {
    loading: false,
  }

  componentDidMount() {
    this.setState({loading: true})
    const data = {
      id: 1,
      page: 1,
      per_page: 14,
    }
    this.props.getAdsByCatId(data).then(() => this.setState({loading: false}))
  }

  renderRow = (rowData, sectionId, index) => {
    const cellViews = rowData.map((ad, id) => (
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
            source={{uri: ad.images[0].img_url}}
          />
          <View styleName="content">
            <Subtitle numberOfLines={3}>{ad.name}</Subtitle>
            <Title>{ad.retail_price}/item</Title>
            <View styleName="horizontal">
              <Caption styleName="collapsible" numberOfLines={2}>
                {ad.company_name}
              </Caption>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    ))

    return <GridRow columns={2}>{cellViews}</GridRow>
  }

  render() {
    console.log(this.props)
    const {ads} = this.props.ads
    const groupedData = GridRow.groupByRows(ads, 2, () => 1)
    return (
      <View styleName="fill-parent">
        {this.state.loading ? (
          <Loading />
        ) : (
          <View>
            <ListView data={groupedData} renderRow={this.renderRow} />
          </View>
        )}
        <View style={{position: 'absolute', bottom: 10, alignSelf: 'center'}}>
          <Button
            style={{
              backgroundColor: ORANGE_COLOR,
              borderColor: 'white',
              borderWidth: 0.8,
              padding: 10,
              borderRadius: 10,
            }}
            onPress={() => this.props.navigation.navigate('AddAdv')}>
            <Icon name="plus-button" style={{color: 'white'}} />
            <Text style={{color: 'white'}}>Add advertisement</Text>
          </Button>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  ads: state.ads,
})

export default connect(
  mapStateToProps,
  {getAdsByCatId, setAd}
)(MainScreen)
