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
  Caption,
  Title,
} from '@shoutem/ui'

import Navbar from '../components/Navbar'

class MainScreen extends React.Component {
  state = {
    restaurants: [
      {
        name: 'Gaspar Brasserie',
        address: '185 Sutter St, San Francisco, CA 94109',
        image: {url: 'https://shoutem.github.io/static/getting-started/restaurant-1.jpg'},
      },
      {
        name: 'Chalk Point Kitchen',
        address: '527 Broome St, New York, NY 10013',
        image: {url: 'https://shoutem.github.io/static/getting-started/restaurant-2.jpg'},
      },
      {
        name: 'Kyoto Amber Upper East',
        address: '225 Mulberry St, New York, NY 10012',
        image: {url: 'https://shoutem.github.io/static/getting-started/restaurant-3.jpg'},
      },
      {
        name: 'Kyoto Amber Upper East',
        address: '225 Mulberry St, New York, NY 10012',
        image: {url: 'https://shoutem.github.io/static/getting-started/restaurant-3.jpg'},
      },
      {
        name: 'Kyoto Amber Upper East',
        address: '225 Mulberry St, New York, NY 10012',
        image: {url: 'https://shoutem.github.io/static/getting-started/restaurant-3.jpg'},
      },
      {
        name: 'Chalk Point Kitchen',
        address: '527 Broome St, New York, NY 10013',
        image: {url: 'https://shoutem.github.io/static/getting-started/restaurant-2.jpg'},
      },
      {
        name: 'Chalk Point Kitchen',
        address: '527 Broome St, New York, NY 10013',
        image: {url: 'https://shoutem.github.io/static/getting-started/restaurant-2.jpg'},
      },
    ],
  }

  renderRow(rowData, sectionId, index) {
    const cellViews = rowData.map((restaurant, id) => (
      <TouchableOpacity key={id} styleName="flexible">
        <Card styleName="flexible">
          <Image
            resizeMode="cover"
            styleName="medium-wide"
            style={{height: 200}}
            source={{uri: restaurant.image.url}}
          />
          <View styleName="content">
            <Subtitle numberOfLines={3}>{restaurant.name}</Subtitle>
            <View styleName="horizontal">
              <Caption styleName="collapsible" numberOfLines={2}>
                {restaurant.address}
              </Caption>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    ))

    return <GridRow columns={2}>{cellViews}</GridRow>
  }

  render() {
    const {restaurants} = this.state
    const groupedData = GridRow.groupByRows(restaurants, 2, () => 1)
    return (
      <View styleName="fill-parent">
        <Navbar navigation={this.props.navigation} />
        <ListView data={groupedData} renderRow={this.renderRow} />
      </View>
    )
  }
}

export default MainScreen
