import e from "express";
import { getSearchAccountsHistory, deleteFromSearchAccountsHistory, addToSearchAccountsHistory, getSearchAccounts } from "../controllers/searchAccountsHistory.js"

const router = e.Router();

router.get('/getAccountsHistory', getSearchAccountsHistory);
router.delete('/deleteFromHistory', deleteFromSearchAccountsHistory);
router.post('/addToSearchHistory', addToSearchAccountsHistory);
router.get('/searchUsers', getSearchAccounts);

export default router;