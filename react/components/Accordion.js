import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Collapse } from 'react-collapse'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'
import { IconCaretDown, IconCaretRight } from 'vtex.styleguide'

class Accordion extends Component {
  static propTypes = {
    /** Title shown in Accordion */
    title: PropTypes.string.isRequired,
    /** Accordion children. Components shown inside Collapse */
    children: PropTypes.node.isRequired,
    /** Internationalization */
    intl: intlShape.isRequired,
  }

  state = {
    open: false,
  }

  render() {
    const { children, title } = this.props
    const { open } = this.state

    return (
      <div>
        <div
          className="pointer"
          onClick={() => {
            this.setState({ open: !open })
          }}>
          <div>
            {title && (
              <span className="vtex-footer__accordion-title dib ma0 ttu">
                <FormattedMessage id={title} defaultMessage={title} />
              </span>
            )}
            <span className="vtex-footer__accordion-icon fr">
              {open ? <IconCaretDown /> : <IconCaretRight />}
            </span>
          </div>
        </div>

        <div style={{ overflowY: 'auto' }}>
          <Collapse isOpened={open}>{children}</Collapse>
        </div>
      </div>
    )
  }
}

export default injectIntl(Accordion)
