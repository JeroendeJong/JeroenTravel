import React, {Component} from 'react';
import ReactMde, {commands, Command}  from 'react-mde';
import * as Showdown from 'showdown';
import { addField } from 'ra-core';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import 'react-mde/lib/styles/css/react-mde-all.css';

import {createGlobalStyle} from 'styled-components';

import Crypto from 'crypto';



const AddonStyles = createGlobalStyle`
  img {
    width: 150px;
    height: 150px;
  }
`;

const styles = {}
let mdeAPI: any = null
const IMAGE_BUCKET_URL = 'https://storage.googleapis.com/jeroen-travel-images/';

interface ComponentState {
  tab: "write" | "preview" | undefined;
  value: any;
}

const withUploadImageComand: Command = {
  name: "image",
  buttonProps: { "aria-label": "Add image" },
  execute: async (state0: any, api: any) => {
    const el = document.getElementById('hidden-upload-file-input');
    el!.click();
    mdeAPI = api;
  },
  keyCommand: "image"
};

const defaultCommands = commands.getDefaultCommands();
const inputCommands = defaultCommands.map(commandGroup => {
  return {
    ...commandGroup,
    commands: commandGroup.commands.map(command => {
      if (command.name !== 'image') return command;
      return withUploadImageComand;
    })
  };
});

class MarkdownInput extends Component<any, ComponentState> {
  public state: ComponentState = {
    value: '',
    tab: 'write'
  }

  private converter?: Showdown.Converter;
  private fileInput: React.RefObject<HTMLInputElement>;

  constructor(props: any) {
    super(props);

    console.log(props);

    this.fileInput = React.createRef();
  }

  public componentDidMount() {
    const { input: {value} } = this.props;
    this.setState({value});

    this.converter = new Showdown.Converter({
      tables: true,
      simplifiedAutoLink: true,
      strikethrough: true,
      tasklists: true
    });
  }

  private handleValueChange = (value: any) => {
    this.setState({value});
    this.props.input.onChange(value);
  };

  private handleTabChange = (tab: any) => {
    this.setState({tab});
  };

  private handleFilesReceived = (e: any) => {
    if (!mdeAPI) return;
    const file = (this.fileInput! as any).current.files[0];

    const hashedName = Crypto.randomBytes(24).toString('hex');

    const fullFileNameWithHash = `${hashedName}-${file.name}`;
    const mdImageFormat = `![](${IMAGE_BUCKET_URL}${fullFileNameWithHash})`;
    mdeAPI.replaceSelection(mdImageFormat);

    const data = new FormData();
    data.append('file', file)
    data.append('filename', `${hashedName}-${file.name}`);

    fetch('http://localhost:8080/upload/photo?segment_id=20', {
      method: 'PUT',
      body: data
    })
  }

  public render() {
    return (
      <FormControl fullWidth={true} className='ra-input-mde'>
        <AddonStyles/>
        <ReactMde
          commands={inputCommands as any}
          onChange={this.handleValueChange}
          onTabChange={this.handleTabChange}
          value={this.state.value}
          generateMarkdownPreview={markdown => Promise.resolve(this.converter!.makeHtml(markdown))}
          selectedTab={this.state.tab}
        />
        <input id="hidden-upload-file-input" type='file' hidden onChange={this.handleFilesReceived} ref={this.fileInput}/>
      </FormControl>
    );
  }
}

const MarkDownInputWithField = addField(withStyles(styles)(MarkdownInput));

export default MarkDownInputWithField;