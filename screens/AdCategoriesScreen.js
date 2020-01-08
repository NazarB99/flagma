/* eslint-disable camelcase */
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
  GridRow,
  Button,
  Image,
  ListView,
  TouchableOpacity,
  Card,
  Text,
  Icon,
  Caption,
  Title,
} from '@shoutem/ui'
import {connect} from 'react-redux'
import Hamburger from 'react-native-animated-hamburger'

import Languages from '../config/Languages'
import {getAdsByBusiness, setAd} from '../actions/adsActions'
import Navbar from '../components/Navbar'
import Loading from '../components/Loading'
import {MAIN_COLOR, ORANGE_COLOR} from '../config/Constants'

class AdListPageScreen extends React.Component {
  state = {
    loading: false,
  }

  componentWillMount() {
    this.setState({loading: true})
  }

  componentDidMount() {
    const data = {
      id: this.props.navigation.getParam('id'),
      page: 1,
      per_page: 14,
    }
    const type = this.props.navigation.getParam('type')
    if (type && type === 'business') {
      this.props
        .getAdsByBusiness(this.props.user.user.token, data)
        .then(() => this.setState({loading: false}))
      if (this.props.ads.currencies.length > 0) {
        this.setState({loading: false})
      }
    }
  }

  getCurrency = id => this.props.ads.currencies.filter(item => item.id === id)[0].title

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
          <Card
            styleName="flexible"
            style={{
              flexDirection: 'row',
              width: Dimensions.get('window').width - 20,
              marginLeft: 5,
              marginRight: 10,
            }}>
            <Image
              resizeMode="cover"
              styleName="medium-square"
              style={{height: 150, flex: 2}}
              source={{uri: ad.images !== null ? ad.images[0].img_url : ''}}
            />
            <View styleName="content" style={{flex: 3, marginLeft: 5}}>
              <Title style={{color: '#0670ec', marginTop: 10}} numberOfLines={3}>
                {ad.name}
              </Title>
              <Title style={{marginTop: 10}}>
                {`${ad.retail_price} `}
                {this.getCurrency(ad.currency_id) || 'TMT'}
                {Languages[this.props.user.locale].Item}
              </Title>
              <View styleName="horizontal">
                <Caption style={{color: '#525c69'}} styleName="collapsible" numberOfLines={2}>
                  {ad.company_name}
                </Caption>
              </View>
            </View>
          </Card>
        </TouchableOpacity>
      )
    })

    return <GridRow columns={1}>{cellViews}</GridRow>
  }

  render() {
    console.log(this.props)
    const {filtered_ads} = this.props.ads
    const groupedData = GridRow.groupByRows(filtered_ads, 1, () => 1)
    return (
      <View styleName="fill-parent">
        {this.state.loading ? (
          <Loading />
        ) : (
          <View>
            <ListView
              onScroll={({nativeEvent}) => {
                const y = this.state.yAxis
                this.setState({yAxis: nativeEvent.contentOffset.y}, () => {
                  console.log(y)
                  if (y < nativeEvent.contentOffset.y) {
                    this.setState({showButton: false})
                  } else {
                    this.setState({showButton: true})
                  }
                })
              }}
              data={groupedData}
              renderRow={this.renderRow}
            />
          </View>
        )}
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
              onPress={() => this.props.navigation.navigate('AddAdv')}>
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
  {getAdsByBusiness, setAd}
)(AdListPageScreen)
