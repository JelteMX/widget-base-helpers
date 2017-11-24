import declare from 'dojoBaseDeclare';
import widgetBase from 'widgetBase';
import templateMixin from 'dijit/_TemplatedMixin';

// const { packageName, version, widgetFolder } = config;

/**
 * Defines a widget. Use this when you have multiple sub widgets. For a single widget this might be overkill
 *
 * @export
 * @param {string} id
 * @param {string} template
 * @param {{}}} obj
 * @param {any} base
 * @returns
 */
export default function defineWidget(id, template, obj, base, configParam) {
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

    widgetObj._WIDGET_VERSION = version;

    const mixins = [];
    if ('undefined' !== typeof base && null !== base) {
        mixins.push(base);
    } else {
        mixins.push(widgetBase);
    }

    if (template) {
        mixins.push(templateMixin);
        if ('boolean' !== typeof template){
            widgetObj.templateString = template;
        }
    }

    return declare(`${packageName}.${widgetFolder}.${id}`, mixins, widgetObj);
}
