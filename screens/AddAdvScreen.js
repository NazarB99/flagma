/* eslint-disable camelcase */
/* eslint-disable import/named */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
import React, {Component} from 'react'
import {Dimensions, Picker, ScrollView, KeyboardAvoidingView} from 'react-native'
import {View, Heading, TextInput, DropDownMenu, Title, Button, Image} from '@shoutem/ui'
import {connect} from 'react-redux'
import ImagePicker from 'react-native-image-picker'
import {NavigationActions} from 'react-navigation'

import Languages from '../config/Languages'
import {addAdv} from '../actions/adsActions'
import {uploadFile} from '../config/ApiCalls'
import {MAIN_COLOR, ORANGE_COLOR} from '../config/Constants'

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

class AddAdvScreen extends Component {
  state = {
    name: '',
    category: {},
    type: {},
    unit: {},
    currency: {},
    local_images: [],
    images: [],
    description: '',
    retail_price: '',
    wholesale_price_min: '',
    wholesale_price_max: '',
    country: 'turkmenistan',
  }

  componentDidMount() {
    if (!this.props.id || !this.props.is_verified) {
      this.props.navigation.replace('Drawer', {}, NavigationActions.navigate({routeName: 'Main'}))
      alert(Languages[this.props.user.locale].Neither)
    }
    this.setState({
      category: this.props.categories[0],
      currency: this.props.currencies[0],
      unit: this.props.units[0],
      type: types[0],
    })
  }

  imagePicker = () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    }

    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response)
      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      } else {
        this.setState({imageUri: response.uri})
        const source = {
          uri: `file://${response.path}`,
          name: response.fileName,
          type: response.type,
          size: response.fileSize,
        }
        const dataNew = new FormData()
        dataNew.append(response.fileName, source)
        const prevLocalImage = this.state.local_images
        const prevImage = this.state.images
        uploadFile(this.props.token, dataNew)
          .then(res => {
            console.log(res)
            this.setState({
              images: prevImage.concat(res),
              local_images: prevLocalImage.concat(response.uri),
            })
          })
          .catch(() => alert('Error ocurred'))
      }
    })
  }

  onSubmit = () => {
    console.log(this.state)
    const {
      name,
      category,
      type,
      unit,
      currency,
      description,
      retail_price,
      wholesale_price_min,
      wholesale_price_max,
      country,
      images,
    } = this.state
    this.props
      .addAdv(this.props.token, {
        name,
        category_main_id: category.id,
        category_sub_id: category.parent_id,
        type: type.name,
        unit_id: unit.id,
        currency_id: currency.id,
        description,
        retail_price,
        wholesale_price_min,
        wholesale_price_max,
        country,
        images: JSON.stringify(images),
      })
      .then(res => {
        alert(Languages[this.props.user.locale].Willbeposted)
        this.props.navigation.replace('Drawer')
      })
      .catch(err => alert(JSON.stringify(err)))
  }

  render() {
    const {category, type, unit, currency} = this.state
    console.log(this.state)
    return (
      <KeyboardAvoidingView style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          <View style={{alignItems: 'center', backgroundColor: MAIN_COLOR, paddingHorizontal: 10}}>
            <Heading style={{marginVertical: 10, color: 'white'}}>
              {Languages[this.props.user.locale].Addadvetisement}
            </Heading>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: Dimensions.get('window').width * 0.95,
                marginBottom: 15,
              }}>
              <Button style={{marginBottom: 5}} onPress={() => this.imagePicker()}>
                <Title>{Languages[this.props.user.locale].Pickimage}</Title>
              </Button>
              {this.state.images.length > 0 ? (
                <View style={{flexDirection: 'row'}}>
                  {this.state.local_images.map(item => {
                    return <Image styleName="medium-square" source={{uri: item}} />
                  })}
                </View>
              ) : null}
            </View>
            <TextInput
              style={{
                width: Dimensions.get('window').width - 20,
                marginBottom: 15,
                borderRadius: 5,
              }}
              placeholder={Languages[this.props.user.locale].Name}
              value={this.state.name}
              onChangeText={text => this.setState({name: text})}
            />
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
            <View style={{flexDirection: 'row', marginBottom: 15}}>
              <TextInput
                style={{flex: 2, marginRight: 5, height: 55, borderRadius: 5}}
                onChangeText={text => this.setState({retail_price: text})}
                value={this.state.retail_price}
                placeholder={Languages[this.props.user.locale].Retailprice}
              />
              <View style={{flex: 1}}>
                <Picker
                  selectedValue={currency || this.props.currencies[0].id}
                  style={{height: 55, backgroundColor: 'white'}}
                  onValueChange={(itemValue, itemIndex) => this.setState({currency: itemValue})}>
                  {this.props.currencies.map(item => (
                    <Picker.Item label={item.title} value={item} />
                  ))}
                </Picker>
              </View>
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
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 15,
              }}>
              <TextInput
                placeholder={Languages[this.props.user.locale].Minwhole}
                value={this.state.wholesale_price_min}
                onChangeText={text => this.setState({wholesale_price_min: text})}
                style={{marginRight: 10, width: Dimensions.get('window').width * 0.45}}
              />
              <TextInput
                placeholder={Languages[this.props.user.locale].Maxwhole}
                value={this.state.wholesale_price_max}
                onChangeText={text => this.setState({wholesale_price_max: text})}
                style={{width: Dimensions.get('window').width * 0.45}}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: Dimensions.get('window').width * 0.95,
                marginBottom: 15,
              }}>
              <TextInput
                placeholder={Languages[this.props.user.locale].Description}
                numberOfLines={15}
                multiline
                value={this.state.description}
                onChangeText={text => this.setState({description: text})}
                style={{
                  borderRadius: 5,
                  alignSelf: 'center',
                  width: Dimensions.get('window').width * 0.9,
                  height: 200,
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: Dimensions.get('window').width * 0.95,
                marginBottom: 15,
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
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

const mapStateToProps = state => ({
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
    addAdv,
  }
)(AddAdvScreen)
