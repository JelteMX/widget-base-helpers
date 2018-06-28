import declare from 'dojoBaseDeclare';
import widgetBase from 'widgetBase';
import templateMixin from 'dijit/_TemplatedMixin';

const isArray = arg => {
    if (Array.isArray) {
        return Array.isArray(arg);
    }
    return '[object Array]' === Object.prototype.toString.call(arg);
};

// const { packageName, version, widgetFolder } = config;

/**
 * Defines a widget. Use this when you have multiple sub widgets. For a single widget this might be overkill
 *
 * @param {string} id Widget id. This is a partial ID, the full ID has the package and widget folder in it as well
 * @param {(string|null)} template Template used by the widget
 * @param {Object} obj Object that extends the base
 * @param {any} [base] Basis of the widget. When omitted, this will use the normal _widgetBase defined by Mendix
 * @param {Object} [configParam] Optional configuration, will take the configuration from Webpack normally
 * @returns {Function} Widget Constructor
 */
export function defineWidget(id, template, obj, base, configParam) {
    const widgetConfig = config || configParam;
    let packageName;
    let version;
    let widgetFolder;

    if ('undefined' !== typeof widgetConfig) {
        packageName = widgetConfig.packageName;
        version = widgetConfig.version;
        widgetFolder = widgetConfig.widgetFolder;
    } else {
        throw new Error('Widget needs a config! Please check your source code!');
    }

    const widgetObj = obj;
    const baseID = packageName + '.' + widgetFolder + '.' + id;

    widgetObj._WIDGET_VERSION = version;
    widgetObj._WIDGET_BASE_ID = baseID;

    const mixins = [];
    if ('undefined' !== typeof base && null !== base) {
        if (isArray(base)) {
            base.forEach(function (mixin) {
                mixins.push(mixin);
            });
        } else {
            mixins.push(base);
        }
    } else {
        mixins.push(widgetBase);
    }

    if (template) {
        mixins.push(templateMixin);
        if ('boolean' !== typeof template){
            widgetObj.templateString = template;
        }
    }

    return declare(baseID, mixins, widgetObj);
}
