import * as React from 'react';
import {
  View,
  Text,
  Image,
  // CameraRoll,
  TouchableWithoutFeedback,
  // Platform,
  // ImagePickerIOS,
  // ActionSheetIOS,
} from 'react-native';
import ImagePickerPropTypes from './ImagePickerPropTypes';
import imagePickerStyles from './style/';
import ImageRoll from './ImageRoll';

export default class ImagePicker extends React.Component<ImagePickerPropTypes, any> {
  static defaultProps = {
    styles: imagePickerStyles,
    onChange() {},
    files: [],
  };

  plusText: any;
  plusWrap: any;

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  onPressIn = () => {
    const styles = this.props.styles;
    this.plusWrap.setNativeProps({
      style: [styles.item, styles.size, styles.plusWrapHighlight],
    });
    this.plusText.setNativeProps({
      style: [styles.plusTextHilight, styles.plusText],
    });
  }

  onPressOut = () => {
    const styles = this.props.styles;
    this.plusWrap.setNativeProps({
      style: [styles.item, styles.size, styles.plusWrapNormal],
    });
    this.plusText.setNativeProps({
      style: [styles.plusText, styles.plusTextNormal],
    });
  }

  // TODO 先统一采用 CameraRoll 形式，注释代码勿删
  // openPickerDialog(type) {
  //   ImagePickerIOS[type]({}, (imageUrl) => {
  //     // 由于性能问题，不能在这里转换 base64， 需要利用 native 模块;
  //     // 这里回调 assets-library, 交给业务自己实现转换 base64
  //     // https://github.com/facebook/react-native/issues/201
  //     console.log(imageUrl)
  //     this.addImage({url: imageUrl});
  //   }, error => {
  //     if (error) {
  //       console.warn(error.message || `{type} error`);
  //       return;
  //     }
  //   });
  // }

  showPicker = () => {
    // if (Platform.OS === "ios") {
    //   ImagePickerIOS.canUseCamera(canUse => {
    //     if (canUse) {
    //       ActionSheetIOS.showActionSheetWithOptions({
    //         options: ['Take Photo', 'Photo Libray', 'Cancel'],
    //         cancelButtonIndex: 2,
    //       }, (btnIndex) => {
    //         if (btnIndex == 0) {
    //           this.openPickerDialog('openCameraDialog');
    //           ImagePickerIOS.openCameraDialog({})
    //         } else if (btnIndex == 1) {
    //           this.openPickerDialog('openSelectDialog');
    //         }
    //       });
    //     } else {
    //       this.openPickerDialog('openSelectDialog');
    //     }
    //   });
    // } else {
    this.setState({
      visible: true,
    });
    // }
  }

  addImage(imageObj) {
    if (!imageObj.url) {
      imageObj.url = imageObj.uri;
      delete imageObj.uri;
    }
    const newImages = this.props.files.concat(imageObj);
    this.props.onChange(newImages);
  }

  removeImage(idx: number): void {
    const newImages = [];
    this.props.files.forEach((image, index) => {
      if (index !== idx) {
        newImages.push(image);
      }
    });
    this.props.onChange(newImages);
  }

  hideImageRoll = () => {
    this.setState({
      visible: false,
    });
  }

  render() {
    const { styles, files } = this.props;
    return (
      <View style={styles.container}>
        {
          files.map((item: any, index) => (
            <View key={index} style={[styles.item, styles.size]}>
              <Image
                source={{ uri: item.url }}
                style={[styles.size, styles.image]}
              />
              <TouchableWithoutFeedback onPress={() => this.removeImage(index)}>
                <View style={styles.closeWrap}>
                  <Text style={styles.closeText}>×</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          ))
        }

        <TouchableWithoutFeedback
          onPress={this.showPicker}
          onPressIn={this.onPressIn}
          onPressOut={this.onPressOut}
        >
          <View
            ref={conponent => this.plusWrap = conponent}
            style={[styles.item, styles.size, styles.plusWrap, styles.plusWrapNormal]}
          >
            <Text
              ref={conponent => this.plusText = conponent}
              style={[styles.plusNormal, styles.plusText]}
            >+</Text>
          </View>
        </TouchableWithoutFeedback>

        {
          this.state.visible ? (
            <ImageRoll onCancel={this.hideImageRoll} onSelected={imgObj => this.addImage(imgObj)} />
          ) : null
        }
      </View>
    );
  }
}
