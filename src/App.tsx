import { createContext, useMemo, useState } from 'react';

import { Header } from 'components/Header';
import { Posts } from 'components/Posts';

//Css
//Global
import "static/styles/fonts.css"
import "static/styles/global.css"

//Components
import "static/styles/components/hearth-loader.css"
import "static/styles/components/App.css"

type ContextData = {
  favoriteChange: boolean,
  setFavoriteChange: any
}

export const FavoritesContext = createContext({
  favoriteChange: false,
  setFavoriteChange: (value: boolean) => {},
});

function App() {
  const [favoriteChange, setFavoriteChange] = useState(false);
  const value: ContextData = useMemo(
    () => ({ favoriteChange, setFavoriteChange }), 
    [favoriteChange]
  );

  return (
    <FavoritesContext.Provider value={value}>
      <div className="App" >
        <Header />
        <Posts /> 
      </div>
    </FavoritesContext.Provider>
  );
}

export default App;
