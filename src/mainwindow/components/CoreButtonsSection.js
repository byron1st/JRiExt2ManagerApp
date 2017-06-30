import React, { Component } from 'react'

import { Section, Button, ButtonType } from './common'

class CoreButtonsSection extends Component {
  render () {
    return (
      <Section title='Core buttons'>
        <div style={styles.container}>
          <Button buttonType={ButtonType.PRIMARY} onClick={() => console.log('clicked!')}>Get a config</Button>
          <Button buttonType={ButtonType.PRIMARY}>Get a ETTypes</Button>
          <Button buttonType={ButtonType.PRIMARY}>Instrumentation</Button>
        </div>
      </Section>
    )
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row'
  }
}

export default CoreButtonsSection
