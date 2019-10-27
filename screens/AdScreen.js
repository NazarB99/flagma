/* eslint-disable class-methods-use-this */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-no-undef */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Title, Caption, View, Text} from '@shoutem/ui'
import {SliderBox} from 'react-native-image-slider-box'

class AdScreen extends Component {
  imagesForGallery = () => {
    const imagesArr = []
    this.props.ad.images.map(item => {
      imagesArr.push(item.img_url)
    })
    return imagesArr
  }

  render() {
    return (
      <View style={{paddingHorizontal: 5}}>
        <SliderBox
          images={this.imagesForGallery()}
          sliderBoxHeight={250}
          onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
          dotColor="#FFEE58"
          inactiveDotColor="#90A4AE"
        />
        <Caption>Posted at {this.props.ad.post_date}</Caption>
        <Title styleName="bold" style={{marginTop: 20}}>
          {this.props.ad.wholesale_price_min}$/it - {this.props.ad.wholesale_price_max}$/it
        </Title>
        <Title styleName="bold" style={{marginTop: 10}}>
          Description
        </Title>
        <Text style={{marginTop: 10}}>{this.props.ad.description}</Text>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  ad: state.ads.selected_ad,
})

export default connect(mapStateToProps)(AdScreen)
