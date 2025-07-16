'use strict';

var React = require('react');
var reactDom = require('react-dom');
var obsidian = require('obsidian');

var jsxRuntime = {exports: {}};

var reactJsxRuntime_production = {};

/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactJsxRuntime_production;

function requireReactJsxRuntime_production () {
	if (hasRequiredReactJsxRuntime_production) return reactJsxRuntime_production;
	hasRequiredReactJsxRuntime_production = 1;
	var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
	  REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
	function jsxProd(type, config, maybeKey) {
	  var key = null;
	  void 0 !== maybeKey && (key = "" + maybeKey);
	  void 0 !== config.key && (key = "" + config.key);
	  if ("key" in config) {
	    maybeKey = {};
	    for (var propName in config)
	      "key" !== propName && (maybeKey[propName] = config[propName]);
	  } else maybeKey = config;
	  config = maybeKey.ref;
	  return {
	    $$typeof: REACT_ELEMENT_TYPE,
	    type: type,
	    key: key,
	    ref: void 0 !== config ? config : null,
	    props: maybeKey
	  };
	}
	reactJsxRuntime_production.Fragment = REACT_FRAGMENT_TYPE;
	reactJsxRuntime_production.jsx = jsxProd;
	reactJsxRuntime_production.jsxs = jsxProd;
	return reactJsxRuntime_production;
}

var reactJsxRuntime_development = {};

/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactJsxRuntime_development;

function requireReactJsxRuntime_development () {
	if (hasRequiredReactJsxRuntime_development) return reactJsxRuntime_development;
	hasRequiredReactJsxRuntime_development = 1;
	"production" !== process.env.NODE_ENV &&
	  (function () {
	    function getComponentNameFromType(type) {
	      if (null == type) return null;
	      if ("function" === typeof type)
	        return type.$$typeof === REACT_CLIENT_REFERENCE
	          ? null
	          : type.displayName || type.name || null;
	      if ("string" === typeof type) return type;
	      switch (type) {
	        case REACT_FRAGMENT_TYPE:
	          return "Fragment";
	        case REACT_PROFILER_TYPE:
	          return "Profiler";
	        case REACT_STRICT_MODE_TYPE:
	          return "StrictMode";
	        case REACT_SUSPENSE_TYPE:
	          return "Suspense";
	        case REACT_SUSPENSE_LIST_TYPE:
	          return "SuspenseList";
	        case REACT_ACTIVITY_TYPE:
	          return "Activity";
	      }
	      if ("object" === typeof type)
	        switch (
	          ("number" === typeof type.tag &&
	            console.error(
	              "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
	            ),
	          type.$$typeof)
	        ) {
	          case REACT_PORTAL_TYPE:
	            return "Portal";
	          case REACT_CONTEXT_TYPE:
	            return (type.displayName || "Context") + ".Provider";
	          case REACT_CONSUMER_TYPE:
	            return (type._context.displayName || "Context") + ".Consumer";
	          case REACT_FORWARD_REF_TYPE:
	            var innerType = type.render;
	            type = type.displayName;
	            type ||
	              ((type = innerType.displayName || innerType.name || ""),
	              (type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef"));
	            return type;
	          case REACT_MEMO_TYPE:
	            return (
	              (innerType = type.displayName || null),
	              null !== innerType
	                ? innerType
	                : getComponentNameFromType(type.type) || "Memo"
	            );
	          case REACT_LAZY_TYPE:
	            innerType = type._payload;
	            type = type._init;
	            try {
	              return getComponentNameFromType(type(innerType));
	            } catch (x) {}
	        }
	      return null;
	    }
	    function testStringCoercion(value) {
	      return "" + value;
	    }
	    function checkKeyStringCoercion(value) {
	      try {
	        testStringCoercion(value);
	        var JSCompiler_inline_result = !1;
	      } catch (e) {
	        JSCompiler_inline_result = true;
	      }
	      if (JSCompiler_inline_result) {
	        JSCompiler_inline_result = console;
	        var JSCompiler_temp_const = JSCompiler_inline_result.error;
	        var JSCompiler_inline_result$jscomp$0 =
	          ("function" === typeof Symbol &&
	            Symbol.toStringTag &&
	            value[Symbol.toStringTag]) ||
	          value.constructor.name ||
	          "Object";
	        JSCompiler_temp_const.call(
	          JSCompiler_inline_result,
	          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
	          JSCompiler_inline_result$jscomp$0
	        );
	        return testStringCoercion(value);
	      }
	    }
	    function getTaskName(type) {
	      if (type === REACT_FRAGMENT_TYPE) return "<>";
	      if (
	        "object" === typeof type &&
	        null !== type &&
	        type.$$typeof === REACT_LAZY_TYPE
	      )
	        return "<...>";
	      try {
	        var name = getComponentNameFromType(type);
	        return name ? "<" + name + ">" : "<...>";
	      } catch (x) {
	        return "<...>";
	      }
	    }
	    function getOwner() {
	      var dispatcher = ReactSharedInternals.A;
	      return null === dispatcher ? null : dispatcher.getOwner();
	    }
	    function UnknownOwner() {
	      return Error("react-stack-top-frame");
	    }
	    function hasValidKey(config) {
	      if (hasOwnProperty.call(config, "key")) {
	        var getter = Object.getOwnPropertyDescriptor(config, "key").get;
	        if (getter && getter.isReactWarning) return false;
	      }
	      return void 0 !== config.key;
	    }
	    function defineKeyPropWarningGetter(props, displayName) {
	      function warnAboutAccessingKey() {
	        specialPropKeyWarningShown ||
	          ((specialPropKeyWarningShown = true),
	          console.error(
	            "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
	            displayName
	          ));
	      }
	      warnAboutAccessingKey.isReactWarning = true;
	      Object.defineProperty(props, "key", {
	        get: warnAboutAccessingKey,
	        configurable: true
	      });
	    }
	    function elementRefGetterWithDeprecationWarning() {
	      var componentName = getComponentNameFromType(this.type);
	      didWarnAboutElementRef[componentName] ||
	        ((didWarnAboutElementRef[componentName] = true),
	        console.error(
	          "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
	        ));
	      componentName = this.props.ref;
	      return void 0 !== componentName ? componentName : null;
	    }
	    function ReactElement(
	      type,
	      key,
	      self,
	      source,
	      owner,
	      props,
	      debugStack,
	      debugTask
	    ) {
	      self = props.ref;
	      type = {
	        $$typeof: REACT_ELEMENT_TYPE,
	        type: type,
	        key: key,
	        props: props,
	        _owner: owner
	      };
	      null !== (void 0 !== self ? self : null)
	        ? Object.defineProperty(type, "ref", {
	            enumerable: false,
	            get: elementRefGetterWithDeprecationWarning
	          })
	        : Object.defineProperty(type, "ref", { enumerable: false, value: null });
	      type._store = {};
	      Object.defineProperty(type._store, "validated", {
	        configurable: false,
	        enumerable: false,
	        writable: true,
	        value: 0
	      });
	      Object.defineProperty(type, "_debugInfo", {
	        configurable: false,
	        enumerable: false,
	        writable: true,
	        value: null
	      });
	      Object.defineProperty(type, "_debugStack", {
	        configurable: false,
	        enumerable: false,
	        writable: true,
	        value: debugStack
	      });
	      Object.defineProperty(type, "_debugTask", {
	        configurable: false,
	        enumerable: false,
	        writable: true,
	        value: debugTask
	      });
	      Object.freeze && (Object.freeze(type.props), Object.freeze(type));
	      return type;
	    }
	    function jsxDEVImpl(
	      type,
	      config,
	      maybeKey,
	      isStaticChildren,
	      source,
	      self,
	      debugStack,
	      debugTask
	    ) {
	      var children = config.children;
	      if (void 0 !== children)
	        if (isStaticChildren)
	          if (isArrayImpl(children)) {
	            for (
	              isStaticChildren = 0;
	              isStaticChildren < children.length;
	              isStaticChildren++
	            )
	              validateChildKeys(children[isStaticChildren]);
	            Object.freeze && Object.freeze(children);
	          } else
	            console.error(
	              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
	            );
	        else validateChildKeys(children);
	      if (hasOwnProperty.call(config, "key")) {
	        children = getComponentNameFromType(type);
	        var keys = Object.keys(config).filter(function (k) {
	          return "key" !== k;
	        });
	        isStaticChildren =
	          0 < keys.length
	            ? "{key: someKey, " + keys.join(": ..., ") + ": ...}"
	            : "{key: someKey}";
	        didWarnAboutKeySpread[children + isStaticChildren] ||
	          ((keys =
	            0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}"),
	          console.error(
	            'A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />',
	            isStaticChildren,
	            children,
	            keys,
	            children
	          ),
	          (didWarnAboutKeySpread[children + isStaticChildren] = true));
	      }
	      children = null;
	      void 0 !== maybeKey &&
	        (checkKeyStringCoercion(maybeKey), (children = "" + maybeKey));
	      hasValidKey(config) &&
	        (checkKeyStringCoercion(config.key), (children = "" + config.key));
	      if ("key" in config) {
	        maybeKey = {};
	        for (var propName in config)
	          "key" !== propName && (maybeKey[propName] = config[propName]);
	      } else maybeKey = config;
	      children &&
	        defineKeyPropWarningGetter(
	          maybeKey,
	          "function" === typeof type
	            ? type.displayName || type.name || "Unknown"
	            : type
	        );
	      return ReactElement(
	        type,
	        children,
	        self,
	        source,
	        getOwner(),
	        maybeKey,
	        debugStack,
	        debugTask
	      );
	    }
	    function validateChildKeys(node) {
	      "object" === typeof node &&
	        null !== node &&
	        node.$$typeof === REACT_ELEMENT_TYPE &&
	        node._store &&
	        (node._store.validated = 1);
	    }
	    var React$1 = React,
	      REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
	      REACT_PORTAL_TYPE = Symbol.for("react.portal"),
	      REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"),
	      REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"),
	      REACT_PROFILER_TYPE = Symbol.for("react.profiler");
	    var REACT_CONSUMER_TYPE = Symbol.for("react.consumer"),
	      REACT_CONTEXT_TYPE = Symbol.for("react.context"),
	      REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"),
	      REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"),
	      REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"),
	      REACT_MEMO_TYPE = Symbol.for("react.memo"),
	      REACT_LAZY_TYPE = Symbol.for("react.lazy"),
	      REACT_ACTIVITY_TYPE = Symbol.for("react.activity"),
	      REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"),
	      ReactSharedInternals =
	        React$1.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
	      hasOwnProperty = Object.prototype.hasOwnProperty,
	      isArrayImpl = Array.isArray,
	      createTask = console.createTask
	        ? console.createTask
	        : function () {
	            return null;
	          };
	    React$1 = {
	      "react-stack-bottom-frame": function (callStackForError) {
	        return callStackForError();
	      }
	    };
	    var specialPropKeyWarningShown;
	    var didWarnAboutElementRef = {};
	    var unknownOwnerDebugStack = React$1["react-stack-bottom-frame"].bind(
	      React$1,
	      UnknownOwner
	    )();
	    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
	    var didWarnAboutKeySpread = {};
	    reactJsxRuntime_development.Fragment = REACT_FRAGMENT_TYPE;
	    reactJsxRuntime_development.jsx = function (type, config, maybeKey, source, self) {
	      var trackActualOwner =
	        1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
	      return jsxDEVImpl(
	        type,
	        config,
	        maybeKey,
	        false,
	        source,
	        self,
	        trackActualOwner
	          ? Error("react-stack-top-frame")
	          : unknownOwnerDebugStack,
	        trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
	      );
	    };
	    reactJsxRuntime_development.jsxs = function (type, config, maybeKey, source, self) {
	      var trackActualOwner =
	        1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
	      return jsxDEVImpl(
	        type,
	        config,
	        maybeKey,
	        true,
	        source,
	        self,
	        trackActualOwner
	          ? Error("react-stack-top-frame")
	          : unknownOwnerDebugStack,
	        trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
	      );
	    };
	  })();
	return reactJsxRuntime_development;
}

var hasRequiredJsxRuntime;

function requireJsxRuntime () {
	if (hasRequiredJsxRuntime) return jsxRuntime.exports;
	hasRequiredJsxRuntime = 1;

	if (process.env.NODE_ENV === 'production') {
	  jsxRuntime.exports = requireReactJsxRuntime_production();
	} else {
	  jsxRuntime.exports = requireReactJsxRuntime_development();
	}
	return jsxRuntime.exports;
}

var jsxRuntimeExports = requireJsxRuntime();

class StyleManager {
    static instance;
    refCounts = new Map();
    styleElements = new Map();
    static getInstance() {
        if (!StyleManager.instance) {
            StyleManager.instance = new StyleManager();
        }
        return StyleManager.instance;
    }
    addStyle(id, css) {
        const currentCount = this.refCounts.get(id) || 0;
        const newCount = currentCount + 1;
        this.refCounts.set(id, newCount);
        if (this.styleElements.has(id)) {
            const styleElement = this.styleElements.get(id);
            styleElement.setAttribute('data-ref-count', newCount.toString());
            return;
        }
        const styleElement = document.createElement('style');
        styleElement.id = id;
        styleElement.textContent = css;
        styleElement.setAttribute('data-ref-count', newCount.toString());
        document.head.appendChild(styleElement);
        this.styleElements.set(id, styleElement);
    }
    removeStyle(id) {
        const currentCount = this.refCounts.get(id) || 0;
        if (currentCount <= 1) {
            const styleElement = this.styleElements.get(id);
            if (styleElement) {
                styleElement.remove();
                this.styleElements.delete(id);
            }
            this.refCounts.delete(id);
        }
        else {
            const newCount = currentCount - 1;
            this.refCounts.set(id, newCount);
            const styleElement = this.styleElements.get(id);
            if (styleElement) {
                styleElement.setAttribute('data-ref-count', newCount.toString());
            }
        }
    }
}
const OSETTING_STYLES_ID = 'osetting-styles';
const OSETTING_CSS = `
   .react-obsidian-settings-item {
       padding: 8px !important;
       margin-bottom: 12px !important;
       transition: box-shadow 0.3s ease !important;
       border-bottom: 1px solid var(--color-base-30) !important;
   }
   
   .react-obsidian-settings-item.no-border {
       border-bottom: none !important;
   }
   
   .react-obsidian-settings-item:last-child {
       border-bottom: none !important;
   }
   
   .react-obsidian-settings-item .setting-item .button-active {
       background-color: var(--interactive-accent) !important;
       color: var(--text-on-accent) !important;
   }
   
   .react-obsidian-settings-item .setting-item .clickable-icon {
       color: var(--text-muted);
       transition: color 0.2s ease;
   }
   
   .react-obsidian-settings-item .setting-item .clickable-icon:hover {
       color: var(--text-normal);
   }
   
   .react-obsidian-settings-item .setting-item input[type='text'],
   .react-obsidian-settings-item .setting-item input[type='number'] {
       background-color: var(--background-secondary);
       border: 1px solid var(--background-modifier-border);
       border-radius: 4px;
       padding: 6px 8px;
       width: 100%;
   }
   
   .react-obsidian-settings-item svg {
       width: 18px;
       height: 18px;
       transition: transform 0.2s ease;
       flex-shrink: 0;
   }
   
   .react-obsidian-settings-item.collapsible {
    margin-bottom: 1em;
    }
    
    .react-obsidian-settings-item.collapsible details {
    border: 1px solid transparent;
    border-radius: 4px;
    padding: 0.5em;
}

.react-obsidian-settings-item.collapsible summary {
    outline: none;
    display: list-item;
    list-style: disclosure-closed;
    align-items: center;
    gap: 0.5em;
}

.react-obsidian-settings-item.collapsible details[open] > summary {
    list-style: disclosure-open;
}

.collapsible-content {
    margin-top: 0.75em;
    padding-left: 1em;
    display: flex;
    flex-direction: column;
    gap: 0.75em;
}


`;

const ODetails = ({ name, desc, defaultExpanded = false, expanded, onToggle, className, children, }) => {
    const [internalOpen, setInternalOpen] = React.useState(defaultExpanded);
    const isControlled = expanded !== undefined;
    const open = isControlled ? expanded : internalOpen;
    React.useLayoutEffect(() => {
        if (process.env.OSETTING_DISABLE_STYLES === 'true') {
            return;
        }
        StyleManager.getInstance().addStyle(OSETTING_STYLES_ID, OSETTING_CSS);
        return () => {
            StyleManager.getInstance().removeStyle(OSETTING_STYLES_ID);
        };
    }, []);
    const toggleHandle = React.useCallback((e) => {
        setInternalOpen(e.currentTarget.open);
        onToggle?.(e.currentTarget.open);
    }, [onToggle]);
    return (jsxRuntimeExports.jsx("div", { className: `react-obsidian-settings-item collapsible ${className ?? ''}`, children: jsxRuntimeExports.jsxs("details", { open: open, onToggle: toggleHandle, children: [jsxRuntimeExports.jsxs("summary", { children: [name && jsxRuntimeExports.jsxs("div", { className: 'setting-item-name', children: [name, " "] }), desc && (jsxRuntimeExports.jsx("div", { className: 'setting-item-description', children: desc }))] }), jsxRuntimeExports.jsx("div", { className: 'collapsible-content', children: children })] }) }));
};

const OModal = ({ children, title, onOpen, onClose, maxHeight, maxWidth, width, height, closable = true, className, }) => {
    const modalRoot = document.body;
    const keyDownHandler = React.useCallback((e) => {
        if (e.key === 'Escape' && closable) {
            onClose();
        }
    }, [onClose, closable]);
    React.useEffect(() => {
        window.addEventListener('keydown', keyDownHandler);
        return () => {
            window.removeEventListener('keydown', keyDownHandler);
        };
    }, [onClose]);
    React.useEffect(() => {
        onOpen && onOpen();
    }, [onOpen]);
    const modalContainerStyle = React.useMemo(() => {
        const style = {};
        if (width)
            style['--dialog-width'] = width;
        if (height)
            style.height = height;
        if (maxWidth)
            style['--dialog-max-width'] = maxWidth;
        if (maxHeight)
            style['--dialog-max-height'] = maxHeight;
        if (width && !maxWidth)
            style['--dialog-max-width'] = width;
        if (height && !maxHeight)
            style['--dialog-max-height'] = height;
        return style;
    }, [width, height, maxWidth, maxHeight]);
    return reactDom.createPortal(jsxRuntimeExports.jsxs("div", { className: 'modal-container mod-dim', role: 'dialog', "aria-modal": 'true', "aria-labelledby": 'modal-title', style: modalContainerStyle, children: [jsxRuntimeExports.jsx("div", { className: 'modal-bg', onClick: () => closable && onClose(), style: { opacity: '0.85' }, "aria-hidden": 'true' }), jsxRuntimeExports.jsxs("div", { className: `modal ${className ?? ''}`, children: [jsxRuntimeExports.jsx("div", { className: 'modal-close-button', onClick: () => closable && onClose(), "aria-label": 'Close modal' }), jsxRuntimeExports.jsx("div", { className: 'modal-header', children: jsxRuntimeExports.jsx("div", { className: 'modal-title', children: title }) }), jsxRuntimeExports.jsx("div", { className: 'modal-content', style: {
                            position: 'relative',
                            zIndex: 100000,
                        }, children: children })] })] }), modalRoot);
};

const ButtonWrapper = ({ children, disabled }) => {
    const buttonRef = React.useRef(null);
    const props = children.props;
    const iconName = props['data-icon'];
    React.useLayoutEffect(() => {
        const el = buttonRef.current;
        if (!el || !iconName || disabled)
            return;
        obsidian.setIcon(el, iconName);
    }, [disabled, iconName]);
    return React.cloneElement(children, {
        ref: buttonRef,
        disabled: disabled,
        tabIndex: disabled ? -1 : props.tabIndex || 0,
        style: {
            ...props.style,
            opacity: disabled ? 0.6 : 1,
            cursor: disabled ? 'not-allowed' : 'default',
        },
    });
};

const CheckboxWrapper = ({ children, disabled: parentDisabled }) => {
    const props = children.props;
    const checkboxRef = React.useRef(null);
    const isDisabled = props.disabled || parentDisabled;
    const isControlled = props.checked !== undefined;
    const [internalChecked, setInternalChecked] = React.useState(props.defaultChecked || false);
    const checked = isControlled ? props.checked : internalChecked;
    const handleDivClick = () => {
        if (isDisabled)
            return;
        checkboxRef.current?.click();
    };
    const handleChange = (e) => {
        if (isDisabled)
            return;
        if (!isControlled) {
            setInternalChecked(e.target.checked);
        }
        if (props.onChange) {
            props.onChange(e);
        }
    };
    const ariaProps = Object.keys(props).reduce((acc, key) => {
        if (key.startsWith('aria-')) {
            acc[key] = props[key];
        }
        return acc;
    }, {});
    return (jsxRuntimeExports.jsx("div", { className: `checkbox-container ${checked ? 'is-enabled' : ''} ${isDisabled ? 'is-disabled' : ''}`, onClick: handleDivClick, ...ariaProps, style: {
            cursor: isDisabled ? 'not-allowed' : 'default',
            opacity: isDisabled ? 0.6 : 1,
        }, children: React.cloneElement(children, {
            ref: checkboxRef,
            tabIndex: isDisabled ? -1 : 0,
            onChange: handleChange,
            checked: checked,
            disabled: isDisabled,
            style: { pointerEvents: 'none' },
            ...Object.keys(ariaProps).reduce((acc, key) => {
                acc[key] = undefined;
                return acc;
            }, {}),
        }) }));
};

const SelectWrapper = ({ children, disabled: parentDisabled }) => {
    const props = children.props;
    const isDisabled = props.disabled || parentDisabled;
    return React.cloneElement(children, {
        className: `dropdown ${props.className || ''}`.trim(),
        tabIndex: isDisabled ? -1 : 0,
        disabled: isDisabled,
        style: {
            ...props.style,
            opacity: isDisabled ? 0.6 : 1,
            cursor: isDisabled ? 'not-allowed' : 'pointer',
        },
    });
};

const SliderWrapper = ({ children, disabled: parentDisabled }) => {
    const props = children.props;
    const isDisabled = props.disabled || parentDisabled;
    const sliderRef = React.useRef(null);
    const [showTooltip, setShowTooltip] = React.useState(false);
    const [tooltipValue, setTooltipValue] = React.useState('');
    const [tooltipPosition, setTooltipPosition] = React.useState({ x: 0, y: 0 });
    const updateTooltipPosition = () => {
        if (sliderRef.current) {
            const rect = sliderRef.current.getBoundingClientRect();
            setTooltipPosition({
                x: rect.left + rect.width / 2,
                y: rect.top - 40,
            });
        }
    };
    const handleInput = (e) => {
        const value = e.currentTarget.value;
        setTooltipValue(value);
        updateTooltipPosition();
        if (props.onInput) {
            props.onInput(e);
        }
    };
    const handleMouseEnter = (e) => {
        setTooltipValue(e.currentTarget.value);
        setShowTooltip(true);
        updateTooltipPosition();
        if (props.onMouseEnter) {
            props.onMouseEnter(e);
        }
    };
    const handleMouseLeave = (e) => {
        setShowTooltip(false);
        if (props.onMouseLeave) {
            props.onMouseLeave(e);
        }
    };
    return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [React.cloneElement(children, {
                ref: sliderRef,
                className: `slider ${props.className || ''}`.trim(),
                tabIndex: isDisabled ? -1 : 0,
                disabled: isDisabled,
                onInput: handleInput,
                onMouseEnter: handleMouseEnter,
                onMouseLeave: handleMouseLeave,
                style: {
                    ...props.style,
                    opacity: isDisabled ? 0.6 : 1,
                    cursor: isDisabled ? 'not-allowed' : 'pointer',
                },
            }), showTooltip && (jsxRuntimeExports.jsx("div", { className: 'tooltip mod-top', style: {
                    position: 'fixed',
                    left: tooltipPosition.x,
                    top: tooltipPosition.y,
                    transform: 'translateX(-50%)',
                    zIndex: 1000,
                    pointerEvents: 'none',
                }, children: tooltipValue }))] }));
};

const WrapElements = (children, parentDisabled) => {
    return React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            const props = child.props;
            const isDisabled = props.disabled || parentDisabled;
            if (child.type === 'input') {
                if (props.type === 'checkbox') {
                    return (jsxRuntimeExports.jsx(CheckboxWrapper, { disabled: isDisabled, children: child }));
                }
                if (props.type === 'range') {
                    return (jsxRuntimeExports.jsx(SliderWrapper, { disabled: isDisabled, children: child }));
                }
                return React.cloneElement(child, {
                    disabled: isDisabled,
                    tabIndex: isDisabled ? -1 : props.tabIndex || 0,
                    style: {
                        ...props.style,
                        opacity: isDisabled ? 0.6 : 1,
                        cursor: isDisabled ? 'not-allowed' : 'text',
                    },
                });
            }
            if (child.type === 'button') {
                return (jsxRuntimeExports.jsx(ButtonWrapper, { disabled: isDisabled, children: child }));
            }
            if (child.type === 'select') {
                return (jsxRuntimeExports.jsx(SelectWrapper, { disabled: isDisabled, children: child }));
            }
            if (child.type === 'textarea') {
                return React.cloneElement(child, {
                    disabled: isDisabled,
                    tabIndex: isDisabled ? -1 : props.tabIndex || 0,
                    style: {
                        ...props.style,
                        opacity: isDisabled ? 0.6 : 1,
                        cursor: isDisabled ? 'not-allowed' : 'text',
                    },
                });
            }
            if (child.type === 'a') {
                return React.cloneElement(child, {
                    tabIndex: isDisabled ? -1 : props.tabIndex || 0,
                    onClick: isDisabled
                        ? (e) => e.preventDefault()
                        : props.onClick,
                    style: {
                        ...props.style,
                        opacity: isDisabled ? 0.6 : 1,
                        cursor: isDisabled ? 'not-allowed' : 'pointer',
                        pointerEvents: isDisabled ? 'none' : 'auto',
                    },
                });
            }
            if (props.onClick || props.onMouseDown || props.onMouseUp) {
                return React.cloneElement(child, {
                    onClick: isDisabled ? undefined : props.onClick,
                    onMouseDown: isDisabled ? undefined : props.onMouseDown,
                    onMouseUp: isDisabled ? undefined : props.onMouseUp,
                    tabIndex: isDisabled ? -1 : props.tabIndex || 0,
                    style: {
                        ...props.style,
                        opacity: isDisabled ? 0.6 : 1,
                        cursor: isDisabled
                            ? 'not-allowed'
                            : props.style?.cursor || 'pointer',
                        pointerEvents: isDisabled ? 'none' : 'auto',
                    },
                    children: props.children
                        ? WrapElements(props.children, isDisabled)
                        : props.children,
                });
            }
            if (props.children) {
                return React.cloneElement(child, {
                    children: WrapElements(props.children, isDisabled),
                });
            }
        }
        return child;
    });
};

const descToFragment = (desc) => {
    const fragment = document.createDocumentFragment();
    const text = typeof desc === 'string' ? desc : desc.join('\n');
    const lines = text.split('\n');
    lines.forEach((line, i) => {
        fragment.append(document.createTextNode(line));
        if (i < lines.length - 1) {
            fragment.append(document.createElement('br'));
        }
    });
    return fragment;
};

const OSetting = ({ name, heading, desc, className, noBorder, disabled, setupObsidianSettingManually, children, }) => {
    const containerRef = React.useRef(null);
    const obsidianSettingRef = React.useRef(null);
    React.useLayoutEffect(() => {
        if (process.env.OSETTING_DISABLE_STYLES === 'true') {
            return;
        }
        StyleManager.getInstance().addStyle(OSETTING_STYLES_ID, OSETTING_CSS);
        return () => {
            StyleManager.getInstance().removeStyle(OSETTING_STYLES_ID);
        };
    }, []);
    React.useLayoutEffect(() => {
        if (!setupObsidianSettingManually || !containerRef.current) {
            return;
        }
        obsidianSettingRef.current?.clear();
        obsidianSettingRef.current = new obsidian.Setting(containerRef.current);
        name && obsidianSettingRef.current.setName(name);
        heading && obsidianSettingRef.current.setHeading();
        desc && obsidianSettingRef.current.setDesc(descToFragment(desc));
        className && obsidianSettingRef.current.setClass(className);
        setupObsidianSettingManually(obsidianSettingRef.current);
        disabled && obsidianSettingRef.current.setDisabled(disabled);
        return () => {
            obsidianSettingRef.current?.clear();
            obsidianSettingRef.current = null;
        };
    }, [setupObsidianSettingManually, name, heading, desc, className]);
    if (setupObsidianSettingManually) {
        return (jsxRuntimeExports.jsx("div", { className: 'react-obsidian-settings-item', children: jsxRuntimeExports.jsx("div", { ref: containerRef }) }));
    }
    return (jsxRuntimeExports.jsx("div", { className: `react-obsidian-settings-item ${noBorder ? 'no-border' : ''} ${className ?? ''}`, children: jsxRuntimeExports.jsxs("div", { className: `setting-item ${heading ? 'setting-item-heading' : ''}`, children: [jsxRuntimeExports.jsxs("div", { className: 'setting-item-info', children: [name && jsxRuntimeExports.jsx("div", { className: 'setting-item-name', children: name }), desc && (jsxRuntimeExports.jsx("div", { className: 'setting-item-description', children: typeof desc === 'string'
                                ? desc
                                : desc.map((line, i) => (jsxRuntimeExports.jsx("div", { children: line }, i))) }))] }), jsxRuntimeExports.jsx("div", { className: 'setting-item-control', children: WrapElements(children, disabled) })] }) }));
};

exports.ODetails = ODetails;
exports.OModal = OModal;
exports.OSetting = OSetting;
