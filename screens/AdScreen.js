/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-no-undef */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Image, Dimensions, Linking} from 'react-native'
import {Title, Caption, View, Text, Button} from '@shoutem/ui'
import {SliderBox} from 'react-native-image-slider-box'
import moment from 'moment'
import Carousel from 'react-native-snap-carousel'

import {MAIN_COLOR, ORANGE_COLOR} from '../config/Constants'

class AdScreen extends Component {
  imagesForGallery = () => {
    const imagesArr = []
    if (this.props.ad.images) {
      this.props.ad.images.map(item => {
        imagesArr.push(item.img_url)
      })
    }
    return imagesArr
  }

  _renderItem({item, index}) {
    return (
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Image
          source={{uri: item.img_url}}
          resizeMode="center"
          style={{
            width: Dimensions.get('window').width,
            height: (238 / 375) * Dimensions.get('window').width,
          }}
        />
      </View>
    )
  }

  render() {
    console.log(this.props.ad)
    return (
      <View style={{flex: 1, paddingHorizontal: 5}}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Carousel
            ref={c => {
              this._carousel = c
            }}
            loop
            enableSnap={false}
            autoplay
            data={this.props.ad.images}
            renderItem={this._renderItem}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={Dimensions.get('window').width * 0.9}
          />
        </View>
        {/* <SliderBox
          ImageComponent={() => {
            return (
              <View style={{height: 300}}>
                <Image
                  resizeMode="center"
                  style={{
                    width: Dimensions.get('window').width,
                    height: (238 / 375) * Dimensions.get('window').width,
                  }}
                />
              </View>
            )
          }}
          images={this.imagesForGallery()}
          sliderBoxHeight={250}
          onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
          dotColor="#FFEE58"
          inactiveDotColor="#90A4AE"
        /> */}
        <Caption>Posted at {moment(this.props.ad.post_date).format('DD MMM YYYY HH:mm')}</Caption>
        <Title styleName="bold" style={{marginTop: 20}}>
          {this.props.ad.wholesale_price_min}$/it - {this.props.ad.wholesale_price_max}$/it
        </Title>
        <Title styleName="bold" style={{marginTop: 30}}>
          Description
        </Title>
        <Text style={{marginTop: 10}}>{this.props.ad.description}</Text>
        <View
          style={{
            borderWidth: 1,
            borderColor: '#dfe1ef',
            paddingHorizontal: 30,
            paddingTop: 5,
            paddingBottom: 15,
            borderRadius: 3,
            marginTop: 15,
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Button style={{padding: 0, margin: 0}}>
              <Text style={{color: '#0670ec', fontSize: 16}}>
                {this.props.ad.business_info[0].company_name},
              </Text>
            </Button>
            <Text
              styleName="bold"
              style={{color: '#000', fontSize: 16, textTransform: 'uppercase'}}>
              {this.props.ad.business_info[0].city}, {this.props.ad.business_info[0].country}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Button
              style={{padding: 0, margin: 0}}
              onPress={() =>
                this.props.navigation.navigate('AdListPage', {
                  type: 'business',
                  id: this.props.ad.business_id,
                })
              }>
              <Text style={{color: '#0670ec'}}>All advetisements of this company:</Text>
            </Button>
            <Text
              styleName="secondary"
              style={{color: '#000', fontSize: 16, textTransform: 'uppercase'}}>
              21
            </Text>
          </View>
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: 10,
            left: Dimensions.get('window').width * 0.05,
          }}>
          <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
            <Button
              onPress={() => Linking.openURL(`tel:${this.props.ad.phone}`)}
              style={{
                backgroundColor: MAIN_COLOR,
                paddingTop: 10,
                paddingBottom: 10,
                width: Dimensions.get('window').width * 0.45,
              }}>
              <Text style={{color: 'white'}}>Call</Text>
            </Button>
            <Button
              onPress={() => {
                // this.props.setOpponentId(this.props)
                this.props.navigation.navigate('Chat', {
                  receiver_id: this.props.ad.business_id,
                })
              }}
              style={{
                backgroundColor: ORANGE_COLOR,
                paddingTop: 10,
                paddingBottom: 10,
                width: Dimensions.get('window').width * 0.45,
              }}>
              <Text style={{color: 'white'}}>In-app Message</Text>
            </Button>
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  ad: state.ads.selected_ad,
})

export default connect(mapStateToProps)(AdScreen)
