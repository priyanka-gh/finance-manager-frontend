export const initialState = {
    user: null,
    expenses: [],
    savings: [],
    income: [],
    totalBalance: 0,
    token: null
}

const reducer = (state, action) => {
    console.log(action);
    switch(action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.token 
            }
        case 'SET_EXPENSES':
            return {
                ...state,
                expenses: action.expenses
            }
        case "SET_INCOME":
            return {
                ...state,
                income: action.income,
            }
        case "SET_TOTALBALANCE":
            return {
                ...state,
                totalBalance: action.totalBalance,
            }
        default:
            return state;
    }
}

export default reducer;