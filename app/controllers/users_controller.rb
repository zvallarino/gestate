class UsersController < ApplicationController

  def index 
    user = User.all
    render json: user
  end 
    
  def create 
    user = User.create(user_params)
    if user.valid?
        render json: user, status: :created 
    else 
        render json: user.errors.full_messages, status: :unprocessable_entity 
    end 
end

    def show
        user = User.find_by(id: session[:user_id])
        if user
          render json: user
        else
          render json: { error: "Not authorized" }, status: :unauthorized
        end
      end
    
end
