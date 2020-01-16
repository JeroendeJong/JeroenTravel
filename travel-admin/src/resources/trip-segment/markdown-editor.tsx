import React, {Component} from 'react';
import ReactMde, {commands, Command}  from 'react-mde';
import * as Showdown from 'showdown';
import { addField } from 'ra-core';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';

import 'react-mde/lib/styles/css/react-mde-all.css';

const styles = {};

interface ComponentState {
  tab: "write" | "preview" | undefined;
  value: any;
}

const withUploadImageComand: Command = {
  name: "image",
  buttonProps: { "aria-label": "Add image" },
  execute: async (state0: any, api: any) => {
    
    const el = document.getElementById('hidden-upload-file-input');
    console.log(el);

    el!.click();

    // Select everything
    // const newSelectionRange = selectWord({
    //   text: state0.text,
    //   selection: state0.selection
    // });
    // const state1 = api.setSelectionRange(newSelectionRange);
    // // Replaces the current selection with the image
    // const imageTemplate =
    //   state1.selectedText || "https://example.com/your-image.png";
    // api.replaceSelection(`![](${imageTemplate})`);
    // // Adjust the selection to not contain the **
    // api.setSelectionRange({
    //   start: 4 + state1.selection.start,
    //   end: 4 + state1.selection.start + imageTemplate.length
    // });

    // return commands!.imageCommand!.execute(state0, api);
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
    console.log(e)
    const files = (this.fileInput! as any).current.files[0].name;

    console.log(files);
    debugger
  }

  public render() {
    return (
      <FormControl fullWidth={true} className='ra-input-mde'>
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