/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable camelcase */
/* eslint-disable no-alert */
/* eslint-disable react/no-unused-state */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-useless-concat */
/* eslint-disable no-undef */
/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, {Component} from 'react'
import {
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator,
  FlatList,
  StatusBar,
  Platform,
  View,
  PermissionsAndroid,
  TouchableOpacity,
  Vibration,
  Image,
} from 'react-native'
import SoftInputMode from 'react-native-set-soft-input-mode'
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome5'
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons'
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput'
import {Button, Overlay} from 'react-native-elements'
import DocumentPicker from 'react-native-document-picker'

import Languages from '../config/Languages'
import {sendMessage, messageListener, messageRead, clearSubscriptions} from '../config/Socket'
import {
  getChatHistory,
  messagesRead,
  clearMessages,
  setMessagesRead,
  pushMessage,
  clearUnreadCounter,
} from '../actions/chatActions'
import {MAIN_COLOR, ORANGE_COLOR} from '../config/Constants'
import Message from '../components/Message'

export class ChatScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.getParam('ChatWithDoctor'),
    headerStyle: {
      backgroundColor: MAIN_COLOR,
    },
    headerTitleStyle: {
      color: ORANGE_COLOR,
    },
    drawerIcon: () => null,
    drawerLabel: () => null,
    headerTintColor: ORANGE_COLOR,
    headerRight: (
      <Button
        onPress={() => navigation.navigate('VideoCall')}
        buttonStyle={{backgroundColor: 'rgba(0,0,0,0)', marginRight: 8}}
        icon={<Icon name="video" color={ORANGE_COLOR} size={22} />}
      />
    ),
  })

  state = {
    messageValue: '',
    selected: [],
    file: '',
    modalVisible: false,
    audioUri: '',
    page: 1,
    per_page: 10,
    filesending: false,
    mediaOptions: false,
  }

  async componentDidMount() {
    const {user} = this.props.user
    if (Platform.OS === 'android') {
      SoftInputMode.set(SoftInputMode.ADJUST_RESIZE)
      // await this.requestCameraPermission()
    }

    const users = {
      receiver_id: this.props.navigation.getParam('receiver_id'),
      sender_id: user.id,
    }

    messageListener(this.props.pushMessage, users)

    messageRead(this.props.messagesRead)

    this.props.clearUnreadCounter()

    this.props.getChatHistory(user.token, {
      receiver_id: this.props.navigation.getParam('receiver_id'),
      page: this.state.page,
      per_page: this.state.per_page,
    })

    this.props.setMessagesRead(user.token, {
      opponent_id: this.props.navigation.getParam('receiver_id'),
    })

    this.props.navigation.setParams({
      ChatWithDoctor: Languages[this.props.user.locale].ChatWithDoctor,
    })
  }

  componentWillUnmount() {
    this.props.clearMessages()
    clearSubscriptions()
  }

  onTypeMessage = messageValue => this.setState({messageValue})

  sendMessage = (attachment = {}) => {
    const text = this.state.messageValue.trim()
    const date = Math.floor(Date.now() / 1000)

    if (!text) return

    const msg = {
      receiver_id: this.props.navigation.getParam('receiver_id'),
      sender_id: this.props.user.user.id,
      message: text,
      is_attachment: attachment.name !== undefined,
      attachment_type: attachment.type,
      temp_id: Math.floor(Math.random() * 1000 + 1),
    }

    console.log(msg)
    sendMessage(msg, this.props.pushMessage)
    // debugger
    // ConnectyCube.createSession({login: 'examplee', password: 'examplee'}, (err, session) => {

    // console.warn(session)
    // })
    this.setState({messageValue: ''})
  }

  _renderMessageItem(message) {
    const isOtherSender = message.sender_id !== this.props.user.user.id

    return (
      <Message
        setMessagesRead={() =>
          this.props.setMessagesRead(this.props.user.user.token, {
            opponent_id: this.props.user.user.created_by,
          })
        }
        goToFullscreen={this.goToFullscreen}
        onStartPlay={this.onStartPlay}
        otherSender={isOtherSender}
        user={this.props.user}
        message={message}
        navigation={this.props.navigation}
        key={message.id}
      />
    )
  }

  getNextMessages = () => {
    const {user} = this.props.user
    this.props
      .getChatHistory(user.token, {
        receiver_id: this.props.navigation.getParam('receiver_id'),
        page: this.state.page + 1,
        per_page: this.state.per_page,
      })
      .then(() => {
        this.setState({page: this.state.page + 1})
      })
  }

  requestAudioPermission = async link => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Разрешение на запись аудио',
          message: 'Нужно чтобы записывать аудио сообщения',
          buttonNeutral: 'Спросить позже',
          buttonNegative: 'Отмена',
          buttonPositive: 'OK',
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.onStartRecord()
      } else {
        console.log('Audio permission denied')
      }
    } catch (err) {
      console.warn(err)
    }
  }

  openDialogAlert = () => {
    this.setState({mediaOptions: true})
  }

  render() {
    const {history} = this.props
    const {messageValue} = this.state
    return (
      <KeyboardAvoidingView
        style={{flex: 1, backgroundColor: 'white'}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={0}>
        {/* <ModalFileLoader
          closeModal={() => this.setState({modalVisible: false})}
          modalVisible={modalVisible}
        /> */}
        <StatusBar backgroundColor="blue" barStyle="light-content" animated />
        <Overlay
          width="auto"
          height="auto"
          isVisible={this.state.filesending}
          containerStyle={{alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large" color={MAIN_COLOR} />
        </Overlay>
        {this.props.loading && (
          <ActivityIndicator style={styles.activityIndicator} size="small" color={MAIN_COLOR} />
        )}
        <FlatList
          inverted
          data={history}
          keyExtractor={item => item.id}
          renderItem={({item}) => this._renderMessageItem(item)}
          onEndReached={this.getNextMessages}
          onEndReachedThreshold={0.01}
        />
        <View style={styles.container}>
          <AutoGrowingTextInput
            style={styles.textInput}
            placeholder={Languages[this.props.user.locale].TypeMessage}
            value={messageValue}
            onChangeText={this.onTypeMessage}
            maxHeight={170}
            minHeight={50}
            enableScrollToCaret
          />
          <TouchableOpacity onPress={() => this.openDialogAlert()} style={styles.button}>
            <IconMaterial name="paperclip" size={32} color={MAIN_COLOR} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPressIn={this.onStartRecord}
            onPressOut={this.onStopRecord}>
            <IconMaterial name="microphone-outline" size={32} color={MAIN_COLOR} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.sendMessage}>
            <IconMaterial name="send" size={32} color={MAIN_COLOR} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: 'lightgrey',
    padding: 12,
  },
  activityIndicator: {
    position: 'absolute',
    alignSelf: 'center',
    paddingTop: 25,
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    fontWeight: '300',
    borderRadius: 25,
    paddingHorizontal: 12,
    paddingTop: Platform.OS === 'ios' ? 14 : 10,
    paddingBottom: Platform.OS === 'ios' ? 14 : 10,
    backgroundColor: 'whitesmoke',
  },
  button: {
    width: 40,
    height: 50,
    marginLeft: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const mapStateToProps = state => ({
  user: state.user,
  history: state.chat.history,
  loading: state.chat.loading,
})

const mapDispatchToProps = dispatch => ({
  getChatHistory: (token, data) => dispatch(getChatHistory(token, data)),
  removeSelected: () => dispatch(removeSelected()),
  pushMessage: message => dispatch(pushMessage(message)),
  clearMessages: () => dispatch(clearMessages()),
  setMessagesRead: (token, data) => dispatch(setMessagesRead(token, data)),
  messagesRead: data => dispatch(messagesRead(data)),
  clearUnreadCounter: () => dispatch(clearUnreadCounter()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatScreen)
