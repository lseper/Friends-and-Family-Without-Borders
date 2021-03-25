Rails.application.routes.draw do
  # shallow: true makes it so that only [:index, :create] actions have /users/ before them
  resources :users do
    # getting all events for a user -- /users/1/events
    resources :questionnaires
    resources :events
    resources :invitations
  end
  # getting one specific event -- /events/1

  post '/login', to: "users#login" 
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
