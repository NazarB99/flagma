/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-undef */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
import React, {Component} from 'react'
import {View, Dimensions, ScrollView, StyleSheet} from 'react-native'
import {TextInput, Text, Button, DropDownMenu, Heading, Title} from '@shoutem/ui'
import {connect} from 'react-redux'

import {setAccountModification} from '../actions/adsActions'
import {MAIN_COLOR, ORANGE_COLOR} from '../config/Constants'

const styles = StyleSheet.create({
  input: {
    width: Dimensions.get('window').width - 20,
    borderRadius: 5,
    marginBottom: 15,
  },
})

class AccountScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    drawerIcon: null,
    drawerTitle: null,
  })

  state = {
    category: {},
    country: '',
    city: '',
    region: '',
    address: '',
    phone: '',
    foundation_year: '',
    employee_count: '',
    website: '',
    business_description: '',
    company_name: '',
  }

  componentDidMount() {
    const {
      category_id,
      city,
      region,
      country,
      address,
      phone,
      foundation_year,
      employee_count,
      website,
      business_description,
      company_name,
    } = this.props.user.user
    const cat = this.props.categories.filter(item => item.id === category_id)[0]
    this.setState({
      category: cat || this.props.categories[0],
      city,
      region,
      country,
      address,
      phone,
      foundation_year: foundation_year + '',
      employee_count: employee_count + '',
      website,
      business_description,
      company_name,
    })
  }

  onSubmit = () => {
    const {
      category,
      city,
      region,
      country,
      address,
      phone,
      foundation_year,
      employee_count,
      website,
      business_description,
      company_name,
    } = this.state
    this.props
      .setAccountModification(this.props.user.user.token, {
        category_main_id: category.id,
        category_sub_id: category.parent_id,
        city,
        region,
        country,
        address,
        phone,
        foundation_year,
        employee_count,
        website,
        business_description,
        company_name,
      })
      .then(() => alert('Evth is ok'))
      .catch(err => console.warn(err))
  }

  render() {
    const {
      category,
      city,
      country,
      region,
      website,
      business_description,
      phone,
      foundation_year,
      address,
      employee_count,
      company_name,
    } = this.state
    console.log(this.props)
    console.log(this.state)
    return (
      <ScrollView>
        <View style={{backgroundColor: MAIN_COLOR, alignItems: 'center', justifyContent: 'center'}}>
          <Heading style={{color: 'white', marginBottom: 15}}>Account info</Heading>
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
          <TextInput
            style={styles.input}
            placeholder="Company Name"
            value={company_name}
            onChangeText={text => this.setState({company_name: text})}
          />
          <TextInput
            style={styles.input}
            placeholder="Country"
            value={country}
            onChangeText={text => this.setState({country: text})}
          />
          <TextInput
            style={styles.input}
            placeholder="Region"
            value={region}
            onChangeText={text => this.setState({region: text})}
          />
          <TextInput
            style={styles.input}
            placeholder="City"
            value={city}
            onChangeText={text => this.setState({city: text})}
          />
          <TextInput
            style={styles.input}
            placeholder="Address"
            value={address}
            onChangeText={text => this.setState({address: text})}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone"
            value={phone}
            onChangeText={text => this.setState({phone: text})}
          />
          <TextInput
            style={styles.input}
            placeholder="Foundation year"
            value={foundation_year}
            onChangeText={text => this.setState({foundation_year: text})}
          />
          <TextInput
            style={styles.input}
            placeholder="Employee count"
            value={employee_count}
            onChangeText={text => this.setState({employee_count: text})}
          />
          <TextInput
            style={styles.input}
            placeholder="Website"
            value={website}
            onChangeText={text => this.setState({website: text})}
          />
          <TextInput
            style={styles.input}
            numberOfLines={15}
            placeholder="Business Description"
            value={business_description}
            onChangeText={text => this.setState({business_description: text})}
          />
          <Button
            style={{
              backgroundColor: ORANGE_COLOR,
              borderColor: 'white',
              borderWidth: 0.8,
              paddingVertical: 10,
              width: Dimensions.get('window').width * 0.9,
              borderRadius: 10,
              marginBottom: 10,
            }}
            onPress={() => this.onSubmit()}>
            {/* <Icon name="plus-button" style={{color: 'white'}} /> */}
            <Title style={{color: 'white'}}>Submit</Title>
          </Button>
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  categories: state.ads.categories,
})

export default connect(
  mapStateToProps,
  {
    setAccountModification,
  }
)(AccountScreen)
