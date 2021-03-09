import { connect } from 'react-redux';
import * as CartActions from 'redux/reducers/cartReducer/actions';
import * as IdentityActions from 'redux/reducers/identityReducer/actions';
import * as NotificationActions from 'redux/reducers/notificationReducer/actions';
import * as SettingsActions from 'redux/reducers/settingsReducer/actions';

class AwareComponentBuilder {
    constructor() {
        this.partialMapStateToPropsList = [];
        this.partialDispatchToPropsList = [];
    }

    withIdentityAwareness() {
        const partialMapDispatch = dispatch => ({
            setIdentity: identity => dispatch(IdentityActions.setIdentity(identity)),
            unsetIdentity: () => dispatch(IdentityActions.unsetIdentity())
        });
        this.partialDispatchToPropsList.push(partialMapDispatch);

        const partialMapState = state => ({
            identity: state.identity
        });
        this.partialMapStateToPropsList.push(partialMapState);

        return this;
    }

    withCartAwareness() {
        const partialMapDispatch = dispatch => ({
            addOrUpdateCartItem: cartItem => dispatch(CartActions.addOrUpdateCartItem(cartItem)),
            removeCartItem: cartItemId => dispatch(CartActions.removeItemFromCart(cartItemId)),
            clearCart: () => dispatch(CartActions.clearCart())
        });
        this.partialDispatchToPropsList.push(partialMapDispatch);

        const partialMapState = state => ({
            cart: state.cart
        });
        this.partialMapStateToPropsList.push(partialMapState);

        return this;
    }

    withSettingsAwareness() {
        const partialMapDispatch = dispatch => ({
            setItemsPerPage: itemsPerPage => dispatch(SettingsActions.setItemsPerPage(itemsPerPage)),
        });
        this.partialDispatchToPropsList.push(partialMapDispatch);

        const partialMapState = state => ({
            settings: state.settings
        });
        this.partialMapStateToPropsList.push(partialMapState);

        return this;
    }

    withNotificationsAwareness() {
        const partialMapDispatch = dispatch => ({
            addNotification: notification => dispatch(NotificationActions.addNotification(notification)),
            clearNotifications: () => dispatch(NotificationActions.clearNotifications())
        });
        this.partialDispatchToPropsList.push(partialMapDispatch);

        const partialMapState = state => ({
            notifications: state.notifications
        });
        this.partialMapStateToPropsList.push(partialMapState);

        return this;
    }

    build(funcComponent) {
        const mapStateToProps = state => {
            let result = {};
            this.partialMapStateToPropsList.forEach(x =>
                result = Object.assign(result, x(state)));
            return result;
        }

        const mapDispatchToProps = dispatch => {
            let result = {};
            this.partialDispatchToPropsList.forEach(x =>
                result = Object.assign(result, x(dispatch)));
            return result;
        }

        return connect(mapStateToProps, mapDispatchToProps)(funcComponent);
    }
}

export default AwareComponentBuilder;