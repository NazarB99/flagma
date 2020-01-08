/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-state */
/* eslint-disable global-require */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React, {Component} from 'react'
import {Dimensions, Picker, ScrollView, KeyboardAvoidingView, TouchableOpacity} from 'react-native'
import {
  View,
  Heading,
  TextInput,
  DropDownMenu,
  Title,
  Button,
  Image,
  GridRow,
  Card,
  Subtitle,
  Caption,
} from '@shoutem/ui'
import {connect} from 'react-redux'
import ImagePicker from 'react-native-image-picker'
import {NavigationActions} from 'react-navigation'

import Languages from '../config/Languages'
import Loading from '../components/Loading'
import {uploadFile} from '../config/ApiCalls'
import {MAIN_COLOR, ORANGE_COLOR} from '../config/Constants'
import {getAdsByCatId, filterAds} from '../actions/adsActions'

const types = [
  {
    name: 'product',
    title: 'Product',
  },
  {
    name: 'service',
    title: 'Service',
  },
]

class FilterScreen extends React.Component {
  state = {
    loading: false,
    yAxis: 0,
    showButton: true,
    categoryModal: false,
    price_min: '',
    price_max: '',
    category: {},
    type: {},
    unit: {},
    currency: {},
    country: 'TM',
  }

  componentDidMount() {
    this.setState({
      category: this.props.categories[0],
      currency: this.props.currencies[0],
      unit: this.props.units[0],
      type: types[0],
    })
  }

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
                {this.getCurrency(ad.currency_id) || 'TMT'}/item
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

  onSubmit = () => {
    const {price_min, price_max, category, currency, unit, country, type} = this.state
    const data = {
      price_min,
      price_max,
      cat_id: category.id,
      type: type.name,
      unit_id: unit.id,
      currency_id: currency.id,
      country,
      page: 1,
      per_page: 40,
    }
    this.props.filterAds(data)

    this.props.navigation.replace(
      'Drawer',
      {},
      NavigationActions.navigate({routeName: 'AdListPage'})
    )
  }

  render() {
    const {category, type, unit, currency} = this.state
    console.log(this.state)
    return (
      <View styleName="fill-parent" style={{backgroundColor: MAIN_COLOR, paddingHorizontal: 10}}>
        {this.state.loading ? (
          <Loading />
        ) : (
          <KeyboardAvoidingView style={{flex: 1}}>
            <ScrollView style={{flex: 1}}>
              <View
                style={{alignItems: 'center', backgroundColor: MAIN_COLOR, paddingHorizontal: 10}}>
                <Heading style={{marginVertical: 10, color: 'white'}}>
                  {Languages[this.props.user.locale].Filter}
                </Heading>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 15,
                  }}>
                  <TextInput
                    placeholder="Price min."
                    value={this.state.price_min}
                    onChangeText={text => this.setState({price_min: text})}
                    style={{marginRight: 10, width: Dimensions.get('window').width * 0.45}}
                  />
                  <TextInput
                    placeholder="Price max."
                    value={this.state.price_max}
                    onChangeText={text => this.setState({price_max: text})}
                    style={{width: Dimensions.get('window').width * 0.45}}
                  />
                </View>
                <View style={{marginBottom: 15}}>
                  {/* <Text style={{color: 'white', marginBottom: 5}}>Select category</Text> */}
                  <DropDownMenu
                    style={{
                      selectedOption: {
                        height: 80,
                      },
                      modal: {
                        marginBottom: 10,
                      },
                    }}
                    styleName="horizontal"
                    options={this.props.categories}
                    selectedOption={category || this.props.categories[0]}
                    onOptionSelected={cat => this.setState({category: cat})}
                    titleProperty="title_tm"
                    valueProperty="categories.id"
                  />
                </View>
                <View style={{marginBottom: 15}}>
                  {/* <Text style={{color: 'white', marginBottom: 5}}>Select category</Text> */}
                  <DropDownMenu
                    style={{
                      selectedOption: {
                        height: 80,
                      },
                      modal: {
                        marginBottom: 10,
                      },
                    }}
                    styleName="horizontal"
                    options={this.props.currencies}
                    selectedOption={currency || this.props.currencies[0]}
                    onOptionSelected={cur => this.setState({currencies: cur})}
                    titleProperty="title"
                    valueProperty="currencies.id"
                  />
                </View>
                <View style={{marginBottom: 15}}>
                  {/* <Text style={{color: 'white', marginBottom: 5}}>Select type</Text> */}
                  <DropDownMenu
                    style={{
                      selectedOption: {
                        height: 80,
                      },
                    }}
                    styleName="horizontal"
                    options={types}
                    selectedOption={type || types[0]}
                    onOptionSelected={type => this.setState({type})}
                    titleProperty="title"
                    valueProperty="types.name"
                  />
                </View>
                <View style={{marginBottom: 15}}>
                  {/* <Text style={{color: 'white', marginBottom: 5}}>Select type</Text> */}
                  <DropDownMenu
                    style={{
                      selectedOption: {
                        height: 80,
                      },
                    }}
                    styleName="horizontal"
                    options={this.props.units}
                    selectedOption={unit || this.props.units[0]}
                    onOptionSelected={un => this.setState({unit: un})}
                    titleProperty="title"
                    valueProperty="units.id"
                  />
                </View>
              </View>
            </ScrollView>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: Dimensions.get('window').width * 0.95,
                marginBottom: 15,
                position: 'absolute',
                bottom: 30,
              }}>
              <Button
                style={{
                  backgroundColor: ORANGE_COLOR,
                  borderColor: 'white',
                  borderWidth: 0.8,
                  paddingVertical: 10,
                  width: Dimensions.get('window').width * 0.9,
                  borderRadius: 10,
                }}
                onPress={() => this.onSubmit()}>
                {/* <Icon name="plus-button" style={{color: 'white'}} /> */}
                <Title style={{color: 'white'}}>{Languages[this.props.user.locale].Submit}</Title>
              </Button>
            </View>
          </KeyboardAvoidingView>
        )}
      </View>
    )
  }
}

const mapStateToProps = state => ({
  ads: state.ads,
  categories: state.ads.categories,
  currencies: state.ads.currencies,
  units: state.ads.units,
  token: state.user.user.token,
  id: state.user.user.id,
  is_verified: state.user.user.is_verified,
  user: state.user,
})

export default connect(
  mapStateToProps,
  {
    getAdsByCatId,
    filterAds,
  }
)(FilterScreen)
