Rails.application.routes.draw do
  # shallow: true makes it so that only [:index, :create] actions have /users/ before them
  resources :users, shallow: true do
    # getting all events for a user -- /users/1/events
    resources :questionnaires, :events, :invitations
  end
  # getting one specific event -- /events/1
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
