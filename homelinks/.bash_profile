if [ -f ~/.bashrc ]; then
       source ~/.bashrc
fi

[[ -s "$HOME/.rvm/scripts/rvm" ]] && source "$HOME/.rvm/scripts/rvm" # Load RVM into a shell session *as a function*

# The next line updates PATH for the Google Cloud SDK.
source '/Users/eli/google-cloud-sdk/path.bash.inc'

# The next line enables shell command completion for gcloud.
source '/Users/eli/google-cloud-sdk/completion.bash.inc'


export WMSJAVA_HOME="/Library/WowzaStreamingEngine-4.7.7/java"

  if [ -f "/usr/local/opt/bash-git-prompt/share/gitprompt.sh" ]; then
    __GIT_PROMPT_DIR="/usr/local/opt/bash-git-prompt/share"
    source "/usr/local/opt/bash-git-prompt/share/gitprompt.sh"
  fi
. "$HOME/.cargo/env"

export PATH="/Users/iameli/.local/share/solana/install/active_release/bin:$PATH"
