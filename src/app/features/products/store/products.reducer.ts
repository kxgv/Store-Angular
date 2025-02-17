import { Action, createReducer, on } from '@ngrx/store';
import * as ProductsActions from '../store/products.actions.ts';

//import * as ScoreboardPageActions from '../actions/scoreboard-page.actions';

export interface State {
  home: number;
  away: number;
}

export const initialState: State = {
  home: 0,
  away: 0,
};

// export const scoreboardReducer = createReducer(
//   initialState,
//   on(ScoreboardPageActions.homeScore, state => ({ ...state, home: state.home + 1 })),
//   on(ScoreboardPageActions.awayScore, state => ({ ...state, away: state.away + 1 })),
//   on(ScoreboardPageActions.resetScore, state => ({ home: 0, away: 0 })),
//   on(ScoreboardPageActions.setScores, (state, { game }) => ({ home: game.home, away: game.away }))
// );



// import { createReducer, on } from '@ngrx/store';
// import { ProductHomeDto } from '../../../api/api.service';

// export const initState: ReadonlyArray<ProductHomeDto> = [{
//   Id: 1,
//   Name: "",
//   Price: 11,
//   Description:"",
//   ImageURL: "",
//   IsFeatured: "1",
// }]; 

// export const productsReducer = createReducer(initState);




