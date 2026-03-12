import React, { Component } from 'react';
import { withTranslation, WithTranslationProps, KotoConsumer } from 'koto-react';

// Example 1: Using withTranslation HOC
interface MyClassComponentProps extends WithTranslationProps {
  title?: string;
}

class MyClassComponent extends Component<MyClassComponentProps> {
  handleLanguageChange = (lang: string) => {
    this.props.setLocale(lang);
  };

  render() {
    const { t, locale, loading } = this.props;

    if (loading) {
      return <div>Loading translations...</div>;
    }

    return (
      <div className="class-component-demo">
        <h3>Class Component with HOC</h3>
        <p>Current locale: {locale}</p>
        <p>{t('common.welcome')}</p>
        <button onClick={() => this.handleLanguageChange('es')}>
          Switch to Spanish
        </button>
      </div>
    );
  }
}

// Wrap the component with HOC
export const MyClassComponentWithTranslation = withTranslation(MyClassComponent);

// Example 2: Using KotoConsumer (render prop pattern)
export class ClassComponentWithConsumer extends Component {
  render() {
    return (
      <KotoConsumer>
        {({ t, locale, setLocale, loading }) => {
          if (loading) {
            return <div>Loading...</div>;
          }

          return (
            <div className="consumer-demo">
              <h3>Class Component with Consumer</h3>
              <p>Locale: {locale}</p>
              <p>{t('auth.login')}</p>
              <select 
                value={locale} 
                onChange={(e) => setLocale(e.target.value)}
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
              </select>
            </div>
          );
        }}
      </KotoConsumer>
    );
  }
}

// Example 3: Legacy class component with static context
import { KotoProvider } from 'koto-react';

interface LegacyComponentState {
  customText: string;
}

class LegacyClassComponent extends Component<MyClassComponentProps, LegacyComponentState> {
  state: LegacyComponentState = {
    customText: ''
  };

  componentDidMount() {
    // You can use translations in lifecycle methods
    this.setState({
      customText: this.props.t('common.hello')
    });
  }

  render() {
    const { t } = this.props;
    
    return (
      <div>
        <h3>Legacy Class Component</h3>
        <p>{this.state.customText}</p>
        <p>{t('auth.logout')}</p>
      </div>
    );
  }
}

export const LegacyComponentWithTranslation = withTranslation(LegacyClassComponent);